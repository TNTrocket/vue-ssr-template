const webpack = require('webpack')
const axios = require('axios')
const MemoryFS = require('memory-fs')
const fs = require('fs')
const Koa = require('koa')
const serve = require("koa-static");
const path = require('path')
const Router = require('koa-router')
// 1、webpack配置文件
const webpackConfig = require('./build/webpack.server')
const {
    createBundleRenderer
} = require("vue-server-renderer");
// 2、编译webpack配置文件
const serverCompiler = webpack(webpackConfig)
const mfs = new MemoryFS()
// 指定输出文件到的内存流中
serverCompiler.outputFileSystem = mfs
// 3、监听文件修改，实时编译获取最新的 vue-ssr-server-bundle.json
let bundle
serverCompiler.watch({}, (err, stats) => {
    if (err) {
        throw err
    }
    stats = stats.toJson()
    stats.errors.forEach(error => console.error(error))
    stats.warnings.forEach(warn => console.warn(warn))
    const bundlePath = path.join(
        webpackConfig.output.path,
        'vue-ssr-server-bundle.json'
    )
    bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
    console.log('new bundle generated')
})
// 处理请求
const handleRequest = async ctx => {
    console.log('path====', ctx.path)
    if (!bundle) {
        ctx.body = '等待webpack打包完成后在访问在访问'
        return
    }
    // 4、获取最新的 vue-ssr-client-manifest.json
    const clientManifestResp = await axios.get('http://localhost:8080/vue-ssr-client-manifest.json')
    const clientManifest = clientManifestResp.data
    const renderer = createBundleRenderer(bundle, {
        runInNewContext: false,
        template: fs.readFileSync(path.resolve(__dirname, "./public/index.ssr.html"), "utf-8"),
        clientManifest: clientManifest
    });
    // console.log('renderer', renderer)
    const html = await renderToString(ctx, renderer)
    ctx.body = html;
}

function renderToString(context, renderer) {
    return new Promise((resolve, reject) => {
        renderer.renderToString(context, (err, html) => {
            console.log('err', err)
            err ? reject(err) : resolve(html);
        });
    });
}
const router = new Router()
router.get("*", handleRequest);
// router.get("/one", handleRequest);
const app = new Koa()
// 开放目录
app.use(serve(path.resolve(__dirname, './dist')));

app.use(router.routes()).use(router.allowedMethods())

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`server started at localhost:${port}`);
});
module.exports = app
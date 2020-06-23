const fs = require('fs');
const path = require('path');

const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const app = new Koa();

const router = new Router();



const serverBundle = require(path.resolve(__dirname, './dist/vue-ssr-server-bundle.json'));
const clientManifest = require(path.resolve(__dirname, './dist/vue-ssr-client-manifest.json'));
const template = fs.readFileSync(path.resolve(__dirname, './dist/index.ssr.html'), 'utf-8');
const renderer = require('vue-server-renderer').createBundleRenderer(serverBundle, {
  runInNewContext: true,
  template: template,
  clientManifest: clientManifest
});

router.get('*', async (ctx, next) => {
  console.log('ctx', ctx.req.url)
  const context = {
    url:ctx.req.url
  }
  let html = await new Promise((resolve, reject) => {
      renderer.renderToString(context, (err, html) => {
        console.log('err', err)
        if (err) {
          reject(err);
        } else {
          resolve(html);
        }
      });
  });
  ctx.body = html;
  ctx.type = 'html';
  ctx.status = 200;
});
app.use(serve(path.resolve(__dirname, './dist')));
app.use(router.routes())
    .use(router.allowedMethods());


app.listen(8080, () => {
  console.log('服务器端渲染地址： http://localhost:8080');
});

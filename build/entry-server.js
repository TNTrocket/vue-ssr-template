import {
  initVue
} from '../src/app.js'
import cookieUtils from 'cookie-parse';
// console.log('global======', global)
global.commonStore = global.commonStore || {}
export default context => {
  // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
  // 以便服务器能够等待所有的内容在渲染前，
  // 就已经准备就绪。
  return new Promise((resolve, reject) => {
    const {
      app,
      store,
      router,
      App
    } = initVue()
    const cookies = cookieUtils.parse(context.cookie || '');
    router.push(context.url)

    router.onReady(() => {

      const matchedComponents = router.getMatchedComponents()
      if (!matchedComponents.length) {
        return reject({
          code: 404
        })
      }
      let tempPromise = matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute,
            cookies
          })
        } else {
          return Promise.resolve()
        }
      })
      Promise.all(tempPromise).then(() => {
        console.log('success=========', store.state)
        global.commonStore = {...store.state, ...global.commonStore}
        console.log('global====', global.commonStore)
        context.state = global.commonStore
        resolve(app)
      }).catch((e) => {
        console.log('e========', e)
      })
    }, reject)
  })
}
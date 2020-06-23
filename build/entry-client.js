//entry-client.js文件
import {
  initVue
} from "../src/app";

const {
  app,
  store,
  router
} = initVue();
// import cookieUtils from 'cookie-parse';

router.onReady(() => {
  if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
  }
  console.log('onReady-----client')
  app.$mount("#app");
});
// router.beforeResolve((to, from, next) => {
//   const matched = router.getMatchedComponents(to);
//   const prevMatched = router.getMatchedComponents(from);

//   // 我们只关心非预渲染的组件
//   // 所以我们对比它们，找出两个匹配列表的差异组件
//   let diffed = false;

//   const activated = matched.filter((c, i) => {
//       return diffed || (diffed = (prevMatched[i] !== c))
//   });
//   console.log('activated=========', activated)
//   if (!activated.length) {
//       return next()
//   }
//   const cookies = cookieUtils.parse(document.cookie);
//   console.log('fafaafafa--------------')
//   Promise.all(activated.map(c => {
//       if (c.asyncData) {
//           // 将cookie透传给数据预取的函数，在服务器进行数据预取时需要手动将cookie传给后端服务器。
//           console.log('clientasyncData============')
//           return c.asyncData({
//               store,
//               route: to,
//               cookies,
//               context: {
//               }
//           })
//       }
//   })).then(() => {
//       next()
//   }).catch(next)
// });
//entry-client.js文件
import {
  initVue
} from "../src/app";

const {
  app,
  store,
  router
} = initVue();

router.onReady(() => {
  if (window.__INITIAL_STATE__) {
    store.replaceState(window.__INITIAL_STATE__)
  }
  app.$mount("#app");
});
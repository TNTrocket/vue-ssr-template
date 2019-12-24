import Vue from "vue";
import App from "./App.vue";
import {
  initRouter
} from "./router";
import {
  createStore
} from './store'

export function initVue() {
  const router = initRouter();
  const store = createStore();
  // sync(store,router);
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  });
  return {
    app,
    store,
    router,
    App
  };
  // return {app,store,App};
}
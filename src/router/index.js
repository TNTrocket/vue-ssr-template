import Vue from 'vue'
import Router from 'vue-router'
import home from '../views/home.vue'

// let home = import('../views/home.vue')
Vue.use(Router)

export function initRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
          path:'/index',
          component: home
      }
    ]
  })
}
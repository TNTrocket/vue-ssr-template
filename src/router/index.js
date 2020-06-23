import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export function initRouter () {
  return new Router({
    mode: 'history',
    routes: [
      {
          path:'/index',
          component: ()=>import('../views/home.vue')
      },
      {
        path:'/one',
        component: ()=>import('../views/one.vue')
      }
    ]
  })
}
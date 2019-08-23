import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "search" */ '@/views/search/index.vue')
    },
    {
      path: '/search-result/:q',
      name: 'search-result',
      // 把参数q传给对应的组件
      props: true,
      component: () => import(/* webpackChunkName: "search-result" */ '@/views/search-result/index.vue')
    },
    {
      path: '/article/:id',
      name: 'article',
      props: true,
      component: () => import(/* webpackChunkName: "article" */ '@/views/article/index.vue')
    },
    {
      path: '/',
      component: () => import(/* webpackChunkName: "layout" */ '@/views/layout-tabbar/index.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')
        },
        {
          path: '/my',
          name: 'my',
          component: () => import(/* webpackChunkName: "my" */ '@/views/my/index.vue')
        }
      ]
    }
  ]
  // routes: [
  //   {
  //     path: '/',
  //     name: 'home',
  //     component: Home
  //   },
  //   {
  //     path: '/about',
  //     name: 'about',
  //     // route level code-splitting
  //     // this generates a separate chunk (about.[hash].js) for this route
  //     // which is lazy-loaded when the route is visited.
  //     component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
  //   }
  // ]
})

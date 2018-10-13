import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index'
import Test from './views/Test'
import Search from './views/Search'
import SearchAll from './views/SearchAll'
import SearchAttention from './views/SearchAttention'
import SearchTree from './views/SearchTree'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'default',
      component: Index
    },
    {
        path: '/index',
        name: 'index',
        component: Index
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
        path: '/search',
        name: 'search',
        component: Search,children:[
            { path: '/search',name: 'searchDefault', component: SearchAll },
            { path: '/search/all',name: 'searchAll', component: SearchAll },
            { path: '/search/attention',name: 'searchAttention',  component: SearchAttention },
            { path: '/search/tree',name: 'searchTree',  component: SearchTree }
        ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

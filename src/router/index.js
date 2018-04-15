import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import HelloWorld from '@/components/HelloWorld'
import Layout from '@/views/layout/Layout'

export default new Router({
  routes: [
    // {
    //   path: '/hello',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    { path: '/login', component: () => import('@/views/login/index'), hidden: true },
    {
      path: '/',
      component: Layout,
      name: 'app',
      meta: { title: 'app' },
      redirect: '/dashboard',
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/dashboard/index'),
          meta: { title: 'appchild' }
        }
      ]
    },
    {
      path: '/partner',
      component: Layout,
      name: 'partner',
      redirect: '/partner/index',
      meta: { title: 'partner' },
      children: [
        {
          path: 'index',
          component: () => import('@/views/partner/index'),
          meta: { title: 'partner' }
        },{
          path: 'index2',
          component: () => import('@/views/partner/index2'),
          meta: { title: 'index2' }
        }
      ]
    }
  ]
})

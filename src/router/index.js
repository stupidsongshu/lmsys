import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/views/layout/Layout'

export default new Router({
  routes: [
    { path: '/login', component: () => import('@/views/login/index'), hidden: true },
    {
      path: '',
      component: Layout,
      redirect: '/dashboard',
      name: 'Dashboard',
      meta: { title: 'Dash' },
      // hidden: true,
      children: [
        {
          path: 'dashboard',
          component: () => import('@/views/dashboard/index'),
          meta: { title: 'Board' }
        }
      ]
    },
    {
      path: '/partner',
      component: Layout,
      name: 'partner',
      redirect: '/partner/list',
      meta: { title: 'Partner' },
      children: [
        {
          path: 'list',
          name: 'PartnerList',
          component: () => import('@/views/partner/list'),
          meta: { title: 'list' }
        },{
          path: 'add',
          name: 'partnerAdd',
          component: () => import('@/views/partner/add'),
          meta: { title: 'add' }
        }
      ]
    }
  ]
})

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
      redirect: '/partner/index',
      meta: { title: 'Partner' },
      children: [
        {
          path: 'index',
          name: 'PartnerIndex1',
          component: () => import('@/views/partner/index'),
          meta: { title: 'PartnerIndex1' }
        },{
          path: 'table',
          name: 'partnerTable',
          component: () => import('@/views/partner/table'),
          meta: { title: 'table' }
        }
      ]
    }
  ]
})

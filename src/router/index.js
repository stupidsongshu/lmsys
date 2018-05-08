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
      path: '/product',
      component: Layout,
      redirect: '/product/list',
      name: 'product',
      meta: { title: 'Product' },
      children: [
        {
          path: 'list',
          component: () => import('@/views/product/list'),
          name: 'productList',
          meta: { title: 'List' }
        },
        {
          path: 'update',
          component: () => import('@/views/product/update'),
          name: 'productUpdate',
          meta: { title: 'Update' }
        }
      ]
    },
    {
      path: '/partner',
      component: Layout,
      redirect: '/partner/list',
      name: 'partner',
      meta: { title: 'Partner' },
      children: [
        {
          path: 'list',
          component: () => import('@/views/partner/list'),
          name: 'partnerList',
          meta: { title: 'List' }
        },{
          path: 'add',
          component: () => import('@/views/partner/add'),
          name: 'partnerAdd',
          meta: { title: 'Add' }
        }
      ]
    }
  ]
})

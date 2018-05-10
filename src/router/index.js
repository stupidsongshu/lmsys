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
          path: 'material',
          component: () => import('@/views/product/material/index'),
          redirect: {name: 'productMaterialStep1'},
          hidden: true,
          name: 'productMaterial',
          meta: { title: 'Material' },
          children: [
            {
              path: 'step1',
              component: () => import('@/views/product/material/step1'),
              name: 'productMaterialStep1',
              meta: { title: 'step1', step: 1 },
            },
            {
              path: 'step2',
              component: () => import('@/views/product/material/step2'),
              name: 'productMaterialStep2',
              meta: { title: 'step2', step: 2 }
            }
          ]
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

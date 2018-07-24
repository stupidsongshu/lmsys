import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/views/layout/Layout'

export const routes = [
  { path: '/login', name: 'login', component: () => import('@/views/login/index'), hidden: true },
  {
    path: '',
    component: Layout,
    // redirect: '/dashboard',
    redirect: {name: 'product'}, // redirect: '/product',
    name: 'dashboard',
    hidden: false,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'dashboard', icon: 'home' }
      }
    ]
  },
  {
    path: '/product',
    component: Layout,
    redirect: '/product/list',
    name: 'product',
    meta: { title: 'product', icon: 'product' },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        component: () => import('@/views/product/list'),
        name: 'productList',
        meta: { title: 'productList', icon: 'list' }
      },
      {
        path: 'material',
        component: () => import('@/views/product/material/index'),
        redirect: {name: 'productMaterialStep1'},
        hidden: true,
        name: 'productMaterial',
        meta: { title: 'productMaterial' },
        children: [
          {
            path: 'step1',
            component: () => import('@/views/product/material/step1'),
            name: 'productMaterialStep1',
            meta: { title: 'productMaterialStep1', step: 1 }
          },
          {
            path: 'step2',
            component: () => import('@/views/product/material/step2'),
            name: 'productMaterialStep2',
            meta: { title: 'productMaterialStep2', step: 2 }
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
    meta: { title: 'partner', icon: 'partner' },
    children: [
      {
        path: 'list',
        component: () => import('@/views/partner/list'),
        name: 'partnerList',
        meta: { title: 'partnerList', icon: 'list' }
      },{
        path: 'add',
        component: () => import('@/views/partner/add'),
        name: 'partnerAdd',
        meta: { title: 'partnerAdd', icon: 'add' }
      }
    ]
  }
]

export default new Router({
  routes
})

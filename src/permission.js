import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { Message } from 'element-ui'
import { getUserInfo } from '@/utils/auth'

const whiteList = ['/login']

router.beforeEach((to, from, next) => {
  NProgress.start()
  let userInfo = getUserInfo()
  userInfo = JSON.parse(userInfo)
  console.log(userInfo)
  if (userInfo && userInfo.token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

import axios from 'axios'
import store from '../store'
import { Message, MessageBox } from 'element-ui'
import { getUserInfo } from '@/utils/auth'

const service = axios.create({
  baseURL: process.env.BASE_API,
  // timeout: 20000
})

service.interceptors.request.use(config => {
  return config
})

export default service

import httpSign from '@/utils/http'
import api from '../api/api'

export function login(data) {
  let url = api.login
  let call = 'Account.login'
  return httpSign({url, call, data})
}

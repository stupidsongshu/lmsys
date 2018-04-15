import httpSign from '@/utils/http'

export function login(userInfo) {
  let url = '/lm/c/i'
  let call = 'Account.login'
  return httpSign(url, call, userInfo)
}

import httpSign from '@/utils/http'

export function login(data) {
  let url = '/lm/c/i'
  let call = 'Account.login'
  return httpSign({url, call, data})
}

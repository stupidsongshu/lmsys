import http from '@/views/utils/http'

export function login(url, data={}) {
  return http({
    url: url
  })
}
import request from '../utils/api'

export function getAuth(params) {
  return request({
    url: '/index/stream/toantileech',
    method: 'get',
    params
  })
}
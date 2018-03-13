import { request, config } from 'utils'

const { api } = config
const { user, userLogout, userLogin } = api
/**
 * 登陆函数
 * 
 * @export 
 * @param {object} params 有用户名及密码
 * @returns 
 */
export async function login (params) {
  return request({
    url: userLogin,
    method: 'post',
    data: params,
  })
}
/**
 * 登出函数
 * 
 * @export
 * @param {object} params   用户名/密码
 * @returns 
 */
export async function logout (params) {
  return request({
    url: userLogout,
    method: 'get',
    data: params,
  })
}

export async function query (params) {
  return request({
    url: user.replace('/:id', ''),
    method: 'get',
    data: params,
  })
}

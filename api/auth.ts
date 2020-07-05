import request from 'axios'
const BASEURL = ''
export const apiGetAuthByUserName = (params: Object) => {
  return request({
    url: `${BASEURL}/blade-auth/login`,
    method: 'post',
    params: {
      ...params,
      grant_type: 'password',
      scope: 'all'
    }
  })
}

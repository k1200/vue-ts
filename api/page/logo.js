import request from '~/api/axios'
/*
 * 增 apiSave+ ''，method: post
 * 删 apiDel + ''，method: post
 * 改 apiUpdate + ''，method: post
 * 查 apiGet + ''，method: get
 * 多操作 apiHandle + ''
 * */
export const loginByUsername = data =>
  request({
    url: 'login.cgi',
    method: 'post',
    params: {
      ...data,
      grant_type: 'password',
      scope: 'all',
      type: 'account'
    }
  })
export const forget_pass = params =>
  request({
    url: 'forget_pass.cgi',
    method: 'post',
    params
  })

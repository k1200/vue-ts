/**
 * 全站http配置
 *
 * axios参数说明
 * isSerialize是否开启form表单提交
 * isToken是否需要token
 */
import axios from 'axios'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { Base64 } from 'js-base64'
import website from '~/conf/website'

const BASIC_PATH = 'http://192.168.1.48:1200'

axios.defaults.timeout = 600000
//返回其他状态吗
axios.defaults.validateStatus = function(status) {
  return +status >= 200 && +status <= 500 // 默认的
}
//跨域请求，允许保存cookie
// axios.defaults.withCredentials = true;
// NProgress Configuration
NProgress.configure({
  showSpinner: false
})
//HTTPrequest拦截
axios.interceptors.request.use(
  config => {
    NProgress.start() // start progress bar
    const meta = config.meta || {}
    const isToken = meta.isToken === false
    config.headers['Authorization'] = `Basic ${Base64.encode(
      `${website.clientId}:${website.clientSecret}`
    )}`
    config.headers['version'] = website.version
    console.log(config)
    config.headers['Tenant-Code'] = ''
    config.headers['Blade-Auth'] = 'bearer '
    config.url = `${BASIC_PATH}${config.url}`
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
//HTTPresponse拦截
axios.interceptors.response.use(
  res => {
    NProgress.done()
    const status = +res.data.code || 200
    const message = res.data.msg || '未知错误'

    //如果是401则跳转到登录页面
    if (status === 401) {
      NProgress.done()
    }
    // 如果请求为非200否者默认统一处理
    if (status !== 200) {
      Message({
        message: message,
        type: 'error'
      })
      return Promise.reject(new Error(message))
    }

    return res
  },
  error => {
    NProgress.done()
    return Promise.reject(new Error(error))
  }
)

export default axios

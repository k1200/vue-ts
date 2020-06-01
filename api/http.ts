/**
 * 全站http配置
 *
 * axios参数说明
 */
import axios from 'axios'
import router from '@/router/router'
import { Message } from 'element-ui'
import appConfig from '@/config/app'
import { Base64 } from 'js-base64'

axios.defaults.timeout = 600000
//返回其他状态吗
axios.defaults.validateStatus = function(status) {
  return +status >= 200 && +status <= 500 // 默认的
}
//跨域请求，允许保存cookie
// axios.defaults.withCredentials = true;
// NProgress Configuration

//HTTPrequest拦截
axios.interceptors.request.use(
  config => {
    //headers中配置serialize为true开启序列化
    if (config.method === 'post' && meta.isSerialize === true) {
      config.data = serialize(config.data)
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
//HTTPresponse拦截
axios.interceptors.response.use(
  res => {
    return res
  },
  error => {
    return Promise.reject(new Error(error))
  }
)

export default axios

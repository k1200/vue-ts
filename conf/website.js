/**
 * 全局配置文件
 */
export default {
  title: '集需购乐采管理平台',
  logo: 'J',
  key: 'hjjxg', //配置主键,目前用于存储
  indexTitle: '集需购 Admin',
  clientId: 'backend', // 客户端id
  clientSecret:
    '5e3490700b7e80e5f91f756583f746fbebc541d16d1836b0730e692b0b2aeb84', // 客户端密钥
  dataKey: 'aojdMLNPaBZIXySuJm5EBQQePDqphd92', // 数据秘钥,
  version: 'v1.3.2',
  tenantMode: true, // 是否开启租户模式
  tenantCode: '000000',
  administrator: 'administrator',
  lockPage: '/lock',
  // tokenTime: 120 * 60,
  tokenTime: 11800 * 6000,
  //http的status默认放行不才用统一处理的,
  statusWhiteList: [],
  //配置首页不可关闭
  isFirstPage: false,
  // 最大标签数
  maxTag: 7,
  fistPage: {
    label: '首页',
    value: '/wel/index',
    params: {},
    query: {},
    meta: {
      i18n: 'dashboard'
    },
    group: [],
    close: false
  },
  //配置菜单的属性
  menu: {
    iconDefault: 'iconfont icon-caidan',
    props: {
      label: 'name',
      path: 'path',
      icon: 'source',
      meta: 'meta',
      children: 'children'
    }
  }
}

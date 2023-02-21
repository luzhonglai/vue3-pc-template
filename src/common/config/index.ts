/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-04-29 18:07:01
 * @LastEditors: luzhonglai
 * @LastEditTime: 2023-02-20 14:14:18
 */

/* --------------------------------- 环境配置 封装 -------------------------------- */

const mode = process.env.VUE_APP_MODE || 'prod'

const EnvConfig = {
  dev: {
    baseApi: '/touguan',
    mockApi: 'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api'
  },
  test: {
    baseApi: '/test',
    mockApi: 'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api'
  },
  prod: {
    baseApi: '/prod',
    mockApi: 'https://www.fastmock.site/mock/c1c302e8baed9894c48c17e4738c092e/api'
  }
}

const axiosConfig = {
  /**
   * 开启接口日志调试窗口
   *
   */
  isDebugInfo: true,

  /**
   *
   * 开启mock
   */
  isMock: false,

  /**
   * 接口成功返回状态码
   */
  resultCode: '1',

  /**
   * 接口请求超时时间
   */
  requestTimeout: 5000,

  /**
   * 默认接口请求类型
   * 可选值：application/x-www-form-urlencoded multipart/form-data
   */
  defaultHeaders: 'application/json'
}

export default {
  mode,
  ...EnvConfig[mode],
  ...axiosConfig
}

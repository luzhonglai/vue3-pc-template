/*
 * @Descripttion:  接口日志信息调试工具
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-02-05 14:26:10
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-04-30 09:40:09
 */

import config from './config'

const { isDebugInfo } = config
/**
 * @name:
 * @msg: 接口日志信息
 * @param {*} options
 * @return {*}
 */
export function debugInfo(options: any, error = '') {
  if (process.env.NODE_ENV !== 'production' && isDebugInfo == false) {
    return
  }

  const { headers, method, url, params, startDate, baseURL, data } = options.config
  const poorDate = Date.now() - startDate
  const requstConfig = {
    url,
    method,
    headers
  }
  let stagingRes: any = null
  if (error === 'Network Error') {
    stagingRes = '后端接口连接异常'
  }
  if (error.includes('timeout')) {
    stagingRes = '后端接口请求超时'
  }
  if (error.includes('Request failed with status code')) {
    const code = error.substr(error.length - 3)
    stagingRes = '后端接口' + code + '异常'
  }
  if (options.status == 200) {
    stagingRes = options.data
  }
  console.group('%c当前请求详细信息：', 'background:#000;color:#bada55')
  console.log('%c当前服务：', 'color:#A101A6;font-weight: 600', baseURL)
  console.log('%c请求url：', 'color:#A101A6;font-weight: 600', url)
  console.log('%c请求参数：', 'color:#A101A6;font-weight: 600', params || JSON.parse(data))
  console.log('%c请求配置：', 'color:#A101A6;font-weight: 600', requstConfig)
  console.log('%c请求耗时：', 'color:#A101A6;font-weight: 600', `${poorDate} ms`)
  console.log('%c返回数据：', 'color:#A101A6;font-weight: 600', stagingRes)
  console.groupEnd()
}

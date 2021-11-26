/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-02-16 18:25:50
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-11-25 17:19:03
 */

import config from '@/common/config/'

interface ConfigOptions {
  resultCode: number | string
  defaultHeaders: string
  requestTimeout: number
  isMock?: boolean
  isDebugInfo: boolean | string
  isLocalMock: boolean
  env: string
  baseApi: string
  mockApi: string
}

const axiosConfig: ConfigOptions = {
  /**
   * 开启接口日志调试窗口
   *
   */
  isDebugInfo: true,
  isMock: false,

  /**
   * 接口成功返回状态码
   */
  resultCode: '1',
  requestTimeout: 5000,

  /**
   * 默认接口请求类型
   * 可选值：application/x-www-form-urlencoded multipart/form-data
   */
  defaultHeaders: 'application/json',

  /**
   * api请基础配置
   */
  ...config
}

export default axiosConfig

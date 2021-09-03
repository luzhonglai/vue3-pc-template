/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-02-16 18:25:50
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-08-12 11:15:48
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
   * api请基础配置
   */
  ...config,

  /**
   * 开启接口日志调试窗口
   *
   */
  isDebugInfo: true,

  /**
   *
   * 开启mock监听接口、监听真实接口，404、500 异常走mock代理请求
   */
  isMock: false,

  /**
   *
   *  mock服务坏境控制
   *  true--->本地devMock
   *  false-->线上proMock
   */
  isLocalMock: false,

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

export default axiosConfig

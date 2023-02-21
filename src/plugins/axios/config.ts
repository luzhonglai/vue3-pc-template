/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-02-16 18:25:50
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-11-24 14:39:18
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
  isDebugInfo: true,
  isMock: false,
  isLocalMock: false,
  resultCode: '0',
  requestTimeout: 5000,
  defaultHeaders: 'application/json',
  ...config
}

export default axiosConfig

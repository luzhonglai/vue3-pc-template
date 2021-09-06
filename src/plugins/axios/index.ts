/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-07-21 11:12:56
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-09-04 18:46:51
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosPromise, AxiosResponse, AxiosError } from 'axios'
import qs from 'qs'
import router from '@/router'
import config from './config'
import Storage from '@/utils/cache'
import { debugInfo } from './debugInfo'
import { ElMessage } from 'element-plus'

// 鉴权失败状态码
const { resultCode, isMock, requestTimeout, defaultHeaders } = config
const API_AUTH_STATUS = [403, 70000001, 70000003]
const TOKEN_INVALID = 'Token认证失败，请重新登录'
const NETWORK_ERROR = '网络请求异常，请稍后重试'

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: config.baseApi,
  timeout: requestTimeout || 5000,
  headers: {
    'Content-Type': defaultHeaders
  }
})

service.interceptors.request.use((config: AxiosRequestConfig) => {
  const headers = config.headers
  const { token } = Storage.get('userInfo') || ''
  headers.startDate = Date.now()

  if (headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    config.data = qs.stringify(config.data)
  }

  if (token || !headers.token) headers.token = token
  return config
})

service.interceptors.response.use(
  (response) => {
    const { code, msg, data } = response.data

    if (config.env !== 'prod') debugInfo(response)
    if (code == resultCode) {
      return data
    } else if (API_AUTH_STATUS.includes(code)) {
      setTimeout(() => {
        Storage.clear()
        router.replace('/login')
      }, 1500)
      ElMessage.error(TOKEN_INVALID)
      return Promise.reject(TOKEN_INVALID)
    } else {
      ElMessage.error(msg || NETWORK_ERROR)
      return Promise.reject(msg || NETWORK_ERROR)
    }
  },
  async (error: AxiosError) => {
    const response: any = error.response
    ElMessage.error(error.message || NETWORK_ERROR)
    return Promise.reject(error || NETWORK_ERROR)
  }
)

function fetch(options?: any): AxiosPromise {
  if (options.method.toLowerCase() == 'post') {
    options.data = options.params
  }

  let isMock = config.isMock
  if (typeof options.mock !== 'undefined') {
    isMock = options.mock
  }
  if (config.env === 'prod') {
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }
  return service(options)
}

;['get', 'post', 'put', 'delete', 'patch'].forEach((item) => {
  fetch[item] = (url, data, options) => {
    return fetch({
      url,
      data,
      method: item,
      ...options
    })
  }
})

/**
 * await错误方法封装
 * @param {*} promise promise 函数
 * @[null, data] 成功
 * @[err, null] 失败
 */
export function awaitWrap(promise: any) {
  if (!promise) new Error('需要传入promise')
  return promise.then((data: any) => [null, data]).catch((err: any) => [err, null])
}

export default fetch

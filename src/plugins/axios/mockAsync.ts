/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-02-09 17:18:01
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-02-14 17:06:48
 */

import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios'

import config from '@/axios/config'

import { debugInfo } from './debugInfo'

import qs from 'qs'

const { baseUrl, isLocalMock } = config

/**
 * @name:
 * @msg: Mock服务代理请求
 * @param {*} options
 * @return {*} Promise
 */

const PATH_URL = baseUrl[isLocalMock ? 'devMock' : 'proMock']

const mockAsync: AxiosInstance = axios.create({
  baseURL: PATH_URL, // api 的 base_url
  timeout: config.requestTimeout // 请求超时时间
})

// request拦截器
mockAsync.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.method === 'post' && config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      config.data = qs.stringify(config.data)
    }
    // 记录时间戳
    config['startDate'] = Date.now()
    return config
  },
  (error: AxiosError) => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

mockAsync.interceptors.response.use(
  (response: AxiosResponse) => {
    debugInfo(response)
    return response.data
  },
  async (error: AxiosError) => {
    const response: any = error.response
    debugInfo(response, error.message)
    return Promise.reject(error)
  }
)

export default mockAsync

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

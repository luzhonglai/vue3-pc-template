/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-02-18 15:07:23
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-06-04 16:18:07
 */
import request from './request'

import config from './config'

import { AxiosPromise, ResponseType } from 'axios'

import mockAsync from './mockAsync'
const { defaultHeaders } = config

interface Config {
  url: string
  method: 'get' | 'post' | 'delete' | 'put'
  params?: any
  headersType?: string
  responseType?: ResponseType
  isMock?: boolean
}

function fetch({ url, method = 'post', params = {}, headersType, responseType, isMock }: Config): AxiosPromise {
  const options = {
    url: url,
    method,
    responseType: responseType,
    headers: {
      'Content-Type': headersType || defaultHeaders
    }
  }
  if (options.method == 'get') {
    options['params'] = params
  } else {
    options['data'] = params
  }
  if (isMock) {
    return mockAsync(options)
  } else {
    return request(options)
  }
}

export { fetch, mockAsync }

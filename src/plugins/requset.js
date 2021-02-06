/*
 * @Descripttion: 
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-02-05 11:18:03
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-02-06 23:07:09
 */
'use strict'

import { createApp } from 'vue'
import axios from 'axios'
import { debugInfo, awaitWrap, mockService } from './debugInfo'
import { ElMessage } from 'element-plus'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let isDev = process.env.NODE_ENV == 'development'

const _axios = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  // withCredentials: true // send cookies when cross-domain requests
})

_axios.interceptors.request.use(
  (config) => {
    config.headers['userToken'] = 'o::B07F80B7793D464A95AB1F2274A663B6'
    config['startDate'] = Date.now()
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  (response) => {
    debugInfo(response)
    const res = response.data
    if(res.code !== 200 || res.code !== 1) {
      ElMessage({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    }

    return response.data
  },
  async (error) => {
    let response = error.response
    if (isDev !== true) {
      debugInfo(response)
      return Promise.reject(error)
    }
    let [err, data] = await awaitWrap(mockService(response))
    if (err) {
      return Promise.reject(err)
    }
    return Promise.resolve(data.data)
  }
)

export default {
  install: (app, options) => {
    window.axios = _axios
    app.config.globalProperties.axios = _axios
    Object.defineProperties(app.config.globalProperties, {
        axios: {
          get() {
            return _axios
          },
        },
        $axios: {
          get() {
            return _axios
          },
        },
    })
  }
}

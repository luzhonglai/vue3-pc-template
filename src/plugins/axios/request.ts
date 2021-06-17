/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-06-04 17:08:22
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-06-16 17:08:08
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { Message } from '@/components/Message'
import qs from 'qs'
import config from './config'
import Storage from '@/utils/cache'

import { debugInfo } from './debugInfo'
import mockAsync, { awaitWrap } from './mockAsync'
import router from '@/router'

const { resultCode, baseUrl, isMock } = config
const PATH_URL: string = baseUrl[process.env.VUE_APP_CURENV as string]

// 鉴权失败状态码
const API_AUTH_STATUS = [403, 70000001, 70000003]

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: PATH_URL, // api 的 base_url
  timeout: config.requestTimeout // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.method === 'post' && config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      config.data = qs.stringify(config.data)
    }

    config['startDate'] = Date.now()
    if (Storage.get('token')) {
      config.headers.token = Storage.get('token') //携带权限参数
    }

    return config
  },

  (error: AxiosError) => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    debugInfo(response)
    // if (~response.headers['content-type'].indexOf('application/vnd.ms-excel')) {
    //   console.log('response拦截器----->', response)
    //   return response.data as any
    // }

    if (response.data.code == resultCode) {
      return response.data as any
    } else {
      Message.error(response.data.msg)
      return Promise.reject()
    }

    // 从新登录
    if (API_AUTH_STATUS.includes(response.data.code)) {
      Storage.clear()
      // router.replace('/login')
    }
  },
  async (error: AxiosError) => {
    const response: any = error.response
    // mock 服务开启条件
    if (process.env.NODE_ENV !== 'production' && isMock == true) {
      const options = Object.assign(response.config)
      delete options.baseURL
      const [err, data] = await awaitWrap(mockAsync(options))
      if (err) {
        console.log('err' + err) // for debug
        return Promise.reject(err)
      } else {
        return Promise.resolve(data.data)
      }
    } else {
      debugInfo(response)
      console.log('err' + error) // for debug
      Message.error(error.message)
      return Promise.reject(error)
    }
  }
)

export default service

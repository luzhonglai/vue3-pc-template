/*
 * @Descripttion:  接口日志调试工具
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-02-05 14:26:10
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-02-05 14:42:15
 */

import axios from 'axios'

/**
 * await错误方法封装
 * @param {*} promise promise 函数
 * @[null, data] 成功
 * @[err, null] 失败
 */
export function awaitWrap (promise) {
  if (!promise) new Error('需要传入promise')
  return promise.then((data) => [null, data]).catch((err) => [err, null])
}


/**
 * @name: 
 * @msg: Mock服务
 * @param {*} options 
 * @return {*} Promise
 */
export function mockService(options) {
  let { headers, timeout, url, method, params } = options.config;
  let baseURL = process.env.VUE_APP_MOCK_API;
  const Mock = axios.create({
    baseURL, // url = base url + request url
    timeout,
    headers,
  })

  let asyncReq = {
    url,
    params,
    method: method || 'GET',
    startDate: Date.now()
  }
  
  Mock.interceptors.response.use(
    (response) => {
      const res = response.data
      debugInfo(response)
      return response.data
    }, async(error) => {
      debugInfo(error.response)
      return Promise.reject(error)
    }
  )

  return new Promise((reslove,reject) =>{
    Mock(asyncReq).then((res) => {
      reslove(res)
    }).catch((error) => {
      reject(error)
    })
  })
}


/**
 * @name: 
 * @msg: 接口日志信息
 * @param {*} options
 * @return {*}
 */
function debugInfo(options){
  let { headers, url, params = '' , startDate, baseURL } = options.config;
  let poorDate = Date.now() - startDate;
  let stagingRes = options.data;

  console.group(
      '%c当前请求详细信息： ',
      'background:#000;color:#bada55'
  );
  console.log('%c当前服务：', 'color:#A101A6;font-weight: 600', baseURL);
  console.log('%c请求url：', 'color:#A101A6;font-weight: 600', url);
  console.log('%c请求参数：', 'color:#A101A6;font-weight: 600', params);
  console.log('%c请求配置：', 'color:#A101A6;font-weight: 600', headers);
  console.log('%c请求耗时：', 'color:#A101A6;font-weight: 600', `${poorDate} ms`);
  console.log('%c返回数据：', 'color:#A101A6;font-weight: 600', stagingRes);
  console.groupEnd();

}

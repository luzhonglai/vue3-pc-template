/*
 * @Descripttion: 
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-02-02 11:10:48
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-02-09 17:14:19
 */

 import config from '@/axios/config'

let baseURL = config.baseUrl['devMock']

/**
 * @name: 处理mockurl 转正则
 * @param {string} path url链接
 * @return {*}
 */
export function RegExpUrl(path: string) {
  return RegExp(`${baseURL}${path}.*`)
}





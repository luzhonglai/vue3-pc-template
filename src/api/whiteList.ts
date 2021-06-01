/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-05-27 14:20:00
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-06-01 10:25:21
 */

import { fetch } from '@/plugins/axios/index'

let baseUrl = 'new-order-web'

// 批量删除
const batchRemove = (params) => fetch({ url: `${baseUrl}/overTimeStation/1v/batchInvalid`, method: 'post', params })

const removeItem = (params) => fetch({ url: `${baseUrl}/overTimeStation/v1/invalid/{id}`, method: 'get', params })

const findByPage = (params) => fetch({ url: `${baseUrl}/overTimeStation/v1/findByPage`, method: 'post', params })

export { batchRemove, removeItem, findByPage }

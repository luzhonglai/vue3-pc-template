/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-05-27 14:20:00
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-05-31 12:15:48
 */

import { fetch } from '@/plugins/axios/index'

let baseUrl = '/dev'

// 批量删除
const batchRemove = (params) => fetch({ url: `${baseUrl}/overTimeStation/1v/batchInvalid`, method: 'post', params })

const removeItem = (params) => fetch({ url: `${baseUrl}/overTimeStation/v1/invalid/{id}`, method: 'get', params })

const findByPage = (params) => fetch({ url: `${baseUrl}/overTimeStation/v1/findByPage`, method: 'post', params })
//添加白名单充电站
const createOverTimeStation = (params) => fetch({url: `${baseUrl}/overTimeStation/v1/createOverTimeStation`, method: 'post', params})
//查看白名单操作日志
const queryStationOperationRecord =(params)=>fetch({url: `${baseUrl}/overTimeStation/v1/queryStationOperationRecord/{id}`, method: 'get', params})

export { batchRemove, removeItem, findByPage,createOverTimeStation ,queryStationOperationRecord}

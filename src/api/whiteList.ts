/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-05-27 14:20:00
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-06-03 14:22:02
 */

import { fetch } from '@/plugins/axios/index'

// 批量删除
const batchRemove = (params) => fetch({ url: `/overTimeStation/1v/batchInvalid`, method: 'post', params })

const removeItem = (params) => fetch({ url: `/overTimeStation/v1/invalid/{id}`, method: 'get', params })

//添加白名单充电站
const createOverTimeStation = (params) => fetch({url: `/overTimeStation/v1/createOverTimeStation`, method: 'post', params})
//查看白名单操作日志
const queryStationOperationRecord =(params)=>fetch({url: `/overTimeStation/v1/queryStationOperationRecord/{id}`, method: 'get', params})
const findByPage = (params) => fetch({ url: `/overTimeStation/v1/findByPage`, method: 'post', params })

export { batchRemove, removeItem, findByPage,createOverTimeStation ,queryStationOperationRecord}

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
const batchRemove = (params) => fetch({ url: `/overTimeStation/v1/batchInvalid`, method: 'post', params })

const removeItem = (id) => fetch({ url: `/overTimeStation/v1/invalid/${id}`, method: 'get' })

//添加白名单充电站
const createOverTimeStation = (params) => fetch({url: `/overTimeStation/v1/createOverTimeStation`, method: 'post', params})
//查看白名单操作日志
const queryStationOperationRecord = (params) => fetch({url: `/overTimeOperationRecord/v1/queryStationOperationRecordPage`, method: 'post',params})
const findByPage = (params) => fetch({ url: `/overTimeStation/v1/findByPage`, method: 'post', params })
//产权单位
const findBelongOrganizationList= () => fetch({ url: `/overTimeStation/v1/getSysOrgsByPOuCode`, method: 'get',  })

//查看详情
const findByIdDetail= (id) => fetch({ url: `/overTimeStation/v1/findByIdDetail/${id}`, method: 'get',  })

//资产站列表
const getStationList= (params) => fetch({ url: `/overTimeStation/v1/getStationList`, method: 'post',params  })

export { batchRemove, removeItem, findByPage,createOverTimeStation ,queryStationOperationRecord,findBelongOrganizationList,findByIdDetail,getStationList}

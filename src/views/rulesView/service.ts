/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-06-02 10:15:49
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-06-10 16:15:40
 */

import { fetch } from '@/plugins/axios'

/**
 * @msg  批量启用/禁用
 * @name: 批量启用/禁用
 * @return {*}
 * @param {*} params
 */
const overTimeFeeModel = (params) => fetch({ url: '/overTimeFeeModel/v1/batchValidFeeModel', method: 'post', params })

/**
 * @name:创建规则
 * @return {*}
 * @param {*} params
 */
const createOverModel = (params) =>
  fetch({ url: '/overTimeFeeModel/v1/createOverTimeFeeModelList', method: 'post', params })

/**
 * @name:修改回显/查看详情
 * @return {*}
 * @param {*} params
 */
const findByid = (id) => fetch({ url: `/overTimeFeeModel/v1/findById/${id}`, method: 'get' })

/**
 * @name:查看详情
 * @return {*}
 * @param {*} params
 */
const findByIdDetail = (id) => fetch({ url: `/overTimeFeeModel/v1/findByIdDetail/${id}`, method: 'get' })

/**
 * @name: 列表条件查询
 * @return {*}
 * @param {*} params
 */
const findByPage = (params) => fetch({ url: '/overTimeFeeModel/v1/findByPage', method: 'post', params })

/**
 * @name:禁用
 * @return {*}
 * @param {*} params
 */
const invalidOverTimeFeeModel = (id) =>
  fetch({ url: `/overTimeFeeModel/v1/invalidOverTimeFeeModel/${id}`, method: 'get' })

/**
 * @name:查看白名单操作日志
 * @return {*}
 * @param {*} params
 */
const queryStaReacord = (id) => fetch({ url: `/overTimeFeeModel/v1/queryStationOperationRecord/${id}`, method: 'post' })

/**
 * @name:修改
 * @return {*}
 * @param {*} params
 */
const updateOverTimeFeeModel = (params) =>
  fetch({ url: '/overTimeFeeModel/v1/updateOverTimeFeeModel', method: 'post', params })

/**
 * @name:启用
 * @return {*}
 * @param {*} params
 */
const valOverTimeModel = (id) => fetch({ url: `/overTimeFeeModel/v1/validOverTimeFeeModel/${id}`, method: 'get' })

const findByPageNoAddRule = (params) =>
  fetch({ url: '/overTimeStation/v1/findByPageNoAddRule', method: 'post', params })

export {
  findByPage,
  updateOverTimeFeeModel,
  valOverTimeModel,
  queryStaReacord,
  invalidOverTimeFeeModel,
  findByid,
  createOverModel,
  overTimeFeeModel,
  findByIdDetail,
  findByPageNoAddRule
}

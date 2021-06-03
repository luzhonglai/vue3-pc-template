/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-06-02 10:15:49
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-06-03 14:16:46
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
  fetch({ url: '/overTimeFeeModel/v1/createOverTimeFeeModel', method: 'post', params })

/**
 * @name:修改回显/查看详情
 * @return {*}
 * @param {*} params
 */
const findByid = (params) => fetch({ url: '/overTimeFeeModel/v1/findById/{id}', method: 'get', params })

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
const invalidOverTimeFeeModel = (params) =>
  fetch({ url: '/overTimeFeeModel/v1/invalidOverTimeFeeModel', method: 'post', params })

/**
 * @name:查看白名单操作日志
 * @return {*}
 * @param {*} params
 */
const queryStaReacord = (params) =>
  fetch({ url: '/overTimeFeeModel/v1/queryStationOperationRecord/{id}', method: 'post', params })

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
const valOverTimeModel = (params) =>
  fetch({ url: '/overTimeFeeModel/v1/validOverTimeFeeModel', method: 'post', params })

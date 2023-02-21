/*
 * @Description:
 * @Author: luzhonglai
 * @Date: 2022-12-05 10:03:18
 * @LastEditors: luzhonglai
 * @LastEditTime: 2023-02-21 10:29:15
 * @FilePath: \vue3-pc-template\src\apis\test.ts
 */
import fetch from '@/plugins/axios'

const test = (params) => fetch({ url: '/cloudmusic/', method: 'get', params })

const pdf = (params) =>
  fetch({ url: '/capclub/api/users/getFileBase64ByFileId/633c1c60-0786-4a05-af90-38f1a7bdfe9b', method: 'get', params })

const findChildOptions = (params) =>
  fetch({ url: '/api/metadata/selectOption/findChildOptions', method: 'post', params })

const getFormOp = (
  params = {
    moduleInfoId: 'Object_8flt__u',
    recordType: 'default__u'
  }
) => fetch({ url: '/api/metadata/recordTypeLayout', method: 'post', params })

const create = (params) => fetch({ url: '/api/metadata/data/create', method: 'post', params })

export default { test, pdf, findChildOptions, getFormOp, create }

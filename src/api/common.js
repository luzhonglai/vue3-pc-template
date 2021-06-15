/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-05-10 10:50:43
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-06-15 10:44:30
 */

// 产权管理 和管理单位  合并了  统一走这一个接口
const getSysOrgsByPOuCode = (params) => fetch({ url: '/overTimeStation/v1/getSysOrgsByPOuCode', method: 'get' })

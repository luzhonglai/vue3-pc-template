/*
 * @Description: 
 * @Author: luzhonglai
 * @Date: 2022-12-04 22:01:00
 * @LastEditors: luzhonglai
 * @LastEditTime: 2022-12-05 01:55:33
 * @FilePath: \vue3-pc-template\src\types\index.ts
 */
// import { AppState } from '@/store/modules/app/state'
// import { PermissionState } from '@/store/modules/permission/state'

// vuex state 的模块的类型
type ModuleType = {
  // app: AppState
  // permission: PermissionState
}

// 所有的StateType
export type StateType = ModuleType

// 通用http响
export interface HttpResponse {
  status: number
  statusText: string
  data: {
    code: number
    desc: string
    [key: string]: any
  }
}

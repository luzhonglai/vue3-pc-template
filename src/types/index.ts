import { AppState } from '@/store/modules/app/state'
import { PermissionState } from '@/store/modules/permission/state'

// vuex state 的模块的类型
type ModuleType = {
  app: AppState
  permission: PermissionState
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

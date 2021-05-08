import { Module } from 'vuex'
import { StateType } from '@/types'
// import { AppRouteRecordRaw } from '@/router/types'

interface PermissionState {
  routers: any[]
  addRouters: any[]
  buttonPermissions: Array<string>
}

const state: PermissionState = {
  routers: [],
  addRouters: [],
  buttonPermissions: []
}

const permisson: Module<PermissionState, StateType> = {
  namespaced: true,
  ...state
}

export { PermissionState, state }
export default permisson

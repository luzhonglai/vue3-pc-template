import { Module } from 'vuex'
import { StateType } from '@/types'

interface AppState {
  menuPermission: string
  userName: string
  title: ''
  collapsed: boolean
  isAddRouters: boolean
  isNewRules: boolean
}

const state: AppState = {
  menuPermission: 'menuPermission',
  userName: 'userName',
  title: '',
  collapsed: false,
  isAddRouters: false,
  isNewRules: false
}

const app: Module<AppState, StateType> = {
  namespaced: true,
  ...state
}

export { AppState, state }
export default app

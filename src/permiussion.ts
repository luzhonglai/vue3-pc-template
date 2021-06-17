/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-05-06 14:01:59
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-06-17 10:42:51
 */
import router from './router'

import NProgress from 'nprogress' // 引入进度条

import 'nprogress/nprogress.css' // 进度条样式

import store from '@/store'

import wsCache from '@/utils/cache'

import getPageTitle from '@/utils/getPageTitle'

import { Message } from '@/components/Message'

NProgress.configure({ showSpinner: false }) // NProgress configuration

import { PermissionActionsType } from '@/store/modules/permission/actions'

import { dispatchAction, setStoreState } from '@/store/utils'

import { RouteRecordRaw } from 'vue-router'

const whiteList: string[] = ['/login'] // 白名单

router.beforeEach((to, from, next) => {
  NProgress.start()
  const { token = false } = to.query
  if (token) {
    wsCache.set('token', token)
  }
  // eslint-disable-next-line no-constant-condition
  // debugger
  if (token || wsCache.get('token')) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    next()
  }
})

router.afterEach((to: any) => {
  document.title = getPageTitle(to.meta.title, store.state.app.title)
  NProgress.done() // 结束进度条
})

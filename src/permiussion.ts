/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-05-06 14:01:59
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-05-31 11:54:40
 */
import router from './router'

import NProgress from 'nprogress' // 引入进度条

import 'nprogress/nprogress.css' // 进度条样式

import store from '@/store'

import wsCache from '@/utils/cache'

import getPageTitle from '@/utils/getPageTitle'

NProgress.configure({ showSpinner: false }) // NProgress configuration

import { PermissionActionsType } from '@/store/modules/permission/actions'

import { dispatchAction, setStoreState } from '@/store/utils'

import { RouteRecordRaw } from 'vue-router'

const whiteList: string[] = ['/login'] // 白名单

router.beforeEach((to, from, next) => {
  NProgress.start()
  // eslint-disable-next-line no-constant-condition
  if (true) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next(to)
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      // 否则全部重定向到登录页
      // next({
      //   path: '/login',
      //   query: {
      //     redirect: to.path
      //   }
      // })
    }
  }
})

router.afterEach((to: any) => {
  document.title = getPageTitle(to.meta.title, store.state.app.title)
  NProgress.done() // 结束进度条
})

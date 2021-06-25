/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-05-07 15:35:43
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-06-25 10:04:58
 */

import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

import { AppRouteRecordRaw } from '@/router/types'

const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/whiteList',

    meta: {
      title: '白名单管理',
      icon: ''
    },
    component: () => import('@/views/whiteList/whiteList.vue')
  },
  {
    path: '/rulesView',
    meta: {
      title: '规则管理',
      icon: ''
    },
    component: () => import('@/views/rulesView/index.vue')
  },
  {
    path: '/orderAdmin',
    meta: {
      title: '订单管理',
      icon: ''
    },
    component: () => import('@/views/orderAdmin/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouterMap as RouteRecordRaw[]
})
export { constantRouterMap }
export default router

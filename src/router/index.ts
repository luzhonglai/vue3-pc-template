/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-05-07 15:35:43
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-05-11 17:06:46
 */

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { AppRouteRecordRaw } from '@/router/types'
const Layout = () => import('@/layout/index.vue')
const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    redirect: '/rulesView',
    meta: {
      title: '超时占位',
      icon: 'menu-authAdmin'
    },
    component: Layout,
    children: [
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRouterMap as RouteRecordRaw[]
})
export { constantRouterMap }
export default router

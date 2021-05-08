/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-05-07 15:35:43
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-05-08 10:57:29
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import { AppRouteRecordRaw } from '@/router/types'
const Layout = () => import('@/layout/index.vue')
const constantRouterMap: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    redirect: 'index',
    meta: {
      title: '超时占位',
      icon: 'menu-authAdmin'
    },
    component: Layout,
    children: [
      {
        path: 'whiteList',
        name: 'index',
        meta: {
          title: '白名单管理',
          icon: ''
        },
        component: () => import('@/views/home/whiteList')
      },
      {
        path: '/roleList',
        name: 'roleList',
        meta: {
          title: '规则管理',
          icon: ''
        },
        component: () => import('@/views/home/roleList')
      },
      {
        path: '/orderAdmin',
        name: 'orderAdmin',
        meta: {
          title: '订单管理',
          icon: ''
        },
        component: () => import('@/views/home/orderAdmin')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRouterMap as RouteRecordRaw[]
})
export { constantRouterMap }
export default router

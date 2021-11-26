/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-11-26 15:42:21
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-11-26 16:02:08
 */

import { Button, Cell, CellGroup, Icon, Tabbar, TabbarItem, Image as VanImage } from 'vant'

const plugins = [Button, Icon, Cell, CellGroup, Tabbar, TabbarItem, VanImage]

export const vantPlugins = (vm) => {
  plugins.forEach((item) => {
    vm.component(item.name, item)
  })
}

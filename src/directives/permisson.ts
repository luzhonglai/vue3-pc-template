/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-08-14 23:21:58
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-08-14 23:45:57
 */

/* -------------------------------------------------------------------------- */
import { getStoreGetter } from '@/store/utils'

export default {
  mounted(el: Element, binding: any) {
    const { value } = binding
    const buttonPermissions = getStoreGetter('permission', 'buttonPermissions')
    if (value && value instanceof Array && value.length > 0) {
      const vPermissions = value

      const hasPermission = buttonPermissions.some((item: any) => {
        return vPermissions.includes(item)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error('指令传参错误, [directive/permission.js]')
    }
  }
}

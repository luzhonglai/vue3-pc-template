import { getStoreGetter } from '@/store/utils'

/**
 * @name: 按钮指令
 * @return {*}
 */
export default {
  mounted(el: Element, binding: any) {
    const buttonPermissions = getStoreGetter('permission', 'buttonPermissions')
    const { value } = binding

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

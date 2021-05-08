/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-03-06 10:34:01
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-03-09 10:36:21
 */
// 验证网址
export function isExternal(path: any): boolean {
  return /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/.test(
    path
  )
}

// 验证邮箱
export function isEmail(path: any): boolean {
  return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(path)
}

// 验证手机
export function isPhone(tel: any): boolean {
  return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(tel)
}

// 验证身份证号
export function isIdCard(id: any): boolean {
  return /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(id)
}

// 验证固定电话
export function isTel(tel: any): boolean {
  return /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(tel)
}
// 站长电话校验 可以为空字符串、固定电话、手机号
export function isOperPhone(oNum: any): boolean {
  if (oNum == '') {
    return true
  }
  const strP = /(^(\d{3,4}-)?\d{7,8})$|(^[1][3,4,5,6,7,8,9][0-9]{9})$|(^(400)-?\d{3}-?\d{4})$/
  return strP.test(oNum)
}
// 服务电话校验 可以为固定电话、手机号
export function isServePhone(oNum: any): boolean {
  const strP = /(^(\d{3,4}-)?\d{7,8})$|(^[1][3,4,5,6,7,8,9][0-9]{9})$|(^(400)-?\d{3}-?\d{4})$|(^(\d{3,4}-)?\d{5})$/
  return strP.test(oNum)
}

// 验证数字
export function isNum(num: any): boolean {
  return /^[0-9]*$/.test(num)
}

// 校验社会信用代码
export const isSocialCode = (tel: any) => {
  return /^([0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}|[1-9]\d{14})$/.test(tel)
}

// 校验密码强度
export const PasswordStrength = (tel: any) => {
  return /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,30}$/.test(tel)
}

// 验证经度
export function isLng(oNum: any): boolean {
  const strP = /[0-9]{2,3}\.\d{4,8}$/
  return strP.test(oNum)
}

// 验证纬度
export function isLat(oNum: any): boolean {
  const strP = /[0-9]{2,3}\.\d{4,8}$/
  return strP.test(oNum)
}

// 验证是否为空数组
export function isNullArr(arr: any): boolean {
  console.log('arr', arr)
  console.log('arr', arr.length)
  if (arr.length == 0) {
    return false
  }
  return true
}

/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-02-07 14:21:53
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-05-06 14:48:48
 */

/**
 * @name:
 * @msg: 捕获数据null、undefined
 * @param {any} accessor
 * @param {any} defaultValue
 */
export const npNull = (accessor: any, defaultValue?: any) => {
  // eslint-disable-next-line no-param-reassign
  defaultValue = typeof defaultValue !== 'undefined' ? defaultValue : null
  try {
    const value = accessor()
    // 错误日志
    const error = [undefined, null]
    return error.includes(value) ? defaultValue : value
  } catch (e) {
    if (e instanceof TypeError) {
      return defaultValue
    }
    throw e
  }
}

/**
 * 时间戳转化为年 月 日 时 分 秒
 * number: 传入时间戳
 * format：返回格式，支持自定义，但参数必须与formateArr里保持一致
 */

export const formatDate = (number: string, format: string) => {
  function formatNumber(n: any) {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  const formateArr = ['Y', 'M', 'D', 'h', 'm', 's']
  const returnArr = []
  const date = new Date(number)
  returnArr.push(date.getFullYear())
  returnArr.push(formatNumber(date.getMonth() + 1))
  returnArr.push(formatNumber(date.getDate()))
  returnArr.push(formatNumber(date.getHours()))
  returnArr.push(formatNumber(date.getMinutes()))
  returnArr.push(formatNumber(date.getSeconds()))
  for (const i in returnArr) {
    format = format.replace(formateArr[i], returnArr[i])
  }
  return format
}

/**
 * @name:
 * @msg: 上传文件图片转base64
 * @param {Blob} file
 * @return {*}
 */
export const getBase64 = (file: Blob) => {
  return new Promise(function(resolve, reject) {
    const reader = new FileReader()
    let imgResult: any = ''
    reader.readAsDataURL(file)
    reader.onload = function() {
      imgResult = reader.result
    }
    reader.onerror = function(error) {
      reject(error)
    }
    reader.onloadend = function() {
      resolve(imgResult)
    }
  })
}

/**
 * 对象数组深拷贝
 * @param {Array,Object} source 需要深拷贝的对象数组
 * @param {Array} noClone 不需要深拷贝的属性集合
 */
export function deepClone(source: any, noClone: string[] = []): any {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments deepClone')
  }
  const targetObj: any = source.constructor === Array ? [] : {}
  Object.keys(source).forEach((keys: string) => {
    if (source[keys] && typeof source[keys] === 'object' && noClone.indexOf(keys) === -1) {
      targetObj[keys] = deepClone(source[keys], noClone)
    } else {
      targetObj[keys] = source[keys]
    }
  })
  return targetObj
}

/**
 * 数组去重
 */
export function arrUnique(arr: any[]) {
  return [...new Set(arr)]
}
//字符串去空格  "   a" => "a"
export function trimSpace(str: string) {
  return str.replace(/(^\s*)|(\s*$)/g, '')
}
//数组去空字符串
//["",undefined,null] =>  []
export function arrTrimSpace(array: any) {
  for (let i = 0; i < array.length; i++) {
    let item = array[i]
    if (typeof item == 'string') {
      item = trimSpace(item)
    }
    if (item == '' || item == null || typeof item == 'undefined') {
      array.splice(i, 1)
      i = i - 1
    }
  }
  return array
}

// 获取城市
// import shengShiXian from '@/libs/pca-code'
// export function getCityList() {
//   const arr: any = []
//   shengShiXian.forEach((item) => {
//     item.children.forEach((oItem) => {
//       arr.push({
//         value: oItem.value,
//         label: oItem.label
//       })
//     })
//   })
//   return arr
// }

// // 省-市
// export function getProvinceCityList() {
//   const arr: any = []
//   shengShiXian.forEach((item, index) => {
//     arr.push({
//       value: item.value,
//       label: item.label,
//       children: []
//     })
//     item.children.forEach((oItem) => {
//       arr[index].children.push({
//         value: oItem.value,
//         label: oItem.label
//       })
//     })
//   })
//   return arr
// }

export function formatDatePicker(dateArg: any, isTrue?: any) {
  const date = new Date(dateArg)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  const formatMonth = month < 10 ? `0${month}` : month
  const formatDay = day < 10 ? `0${day}` : day
  if (isTrue) {
    return `${year}/${formatMonth}/${formatDay}` + ' ' + hours + ':' + minutes + ':' + seconds
  }
  return `${year}-${formatMonth}-${formatDay}` + ' ' + hours + ':' + minutes + ':' + seconds
}
export function dateRandom(dateArg: any) {
  const date = new Date(dateArg)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
  const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  const formatMonth = month < 10 ? `0${month}` : month
  const formatDay = day < 10 ? `0${day}` : day

  return `${year}${formatMonth}${formatDay}${hours}${minutes}${seconds}`
}
// 设置y轴最大值
export function setYAxisMaxVal(arrayF: number[]) {
  // 扁平化n维数组方法，与Array.flat()相同
  const flatten = (arr: any) => {
    while (arr.some((item: any) => Array.isArray(item))) {
      arr = [].concat(...arr)
    }
    return arr
  }
  // 计算y轴最大值并返回
  const returnMaxValue = (array: number[], referMax: number): number => {
    try {
      // flat和flatMap方法为ES2019(ES10)方法，目前还未在所有浏览器完全兼容，所以使用trycatch
      if (Math.max(...array.flat(Infinity)) > referMax) {
        referMax = referMax - (Math.max(...array.flat(Infinity)) % referMax) + Math.max(...array.flat(Infinity))
      }
      return referMax
    } catch (error) {
      // 如果客户端不支持flat，则使用上面自己写的flatten来扁平化数组
      if (Math.max(...flatten(array)) > referMax) {
        referMax = referMax - (Math.max(...flatten(array)) % referMax) + Math.max(...flatten(array))
      }
      return referMax
    }
  }
  let maxValue = 10
  maxValue = returnMaxValue(arrayF, maxValue)
  return maxValue
}

/**
 * await错误方法封装
 * @param {*} promise promise 函数
 * @[null, data] 成功
 * @[err, null] 失败
 */
export function awaitWrap(promise: any) {
  if (!promise) new Error('需要传入promise')
  return promise.then((data: any) => [null, data]).catch((err: any) => [err, null])
}
// 计算百分比
export function getPercent(num: number, total: number) {
  if (num && total) {
    num = parseFloat(num.toString())
    total = parseFloat(total.toString())
    if (isNaN(num) || isNaN(total)) {
      return '-'
    }
    return total <= 0 ? '0%' : Math.round((num / total) * 10000) / 100.0 + '%'
  }
}
//阿拉伯数字转换成大写汉字
export function numberParseChina(money: any) {
  //汉字的数字
  const cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  //基本单位
  const cnIntRadice = ['', '拾', '佰', '仟']
  //对应整数部分扩展单位
  const cnIntUnits = ['', '万', '亿', '兆']
  //对应小数部分单位
  const cnDecUnits = ['角', '分', '毫', '厘']
  //整数金额时后面跟的字符
  const cnInteger = '整'
  //整型完以后的单位
  const cnIntLast = '元'
  //最大处理的数字
  const maxNum = 999999999999999.9999
  //金额整数部分
  let integerNum
  //金额小数部分
  let decimalNum
  //输出的中文金额字符串
  let chineseStr = ''
  //分离金额后用的数组，预定义
  let parts
  if (money == '') {
    return ''
  }
  money = parseFloat(money)
  if (money >= maxNum) {
    //超出最大处理数字
    return ''
  }
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger
    return chineseStr
  }
  //转换为字符串
  money = money.toString()
  if (money.indexOf('.') == -1) {
    integerNum = money
    decimalNum = ''
  } else {
    parts = money.split('.')
    integerNum = parts[0]
    decimalNum = parts[1].substr(0, 4)
  }
  //获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0
    const IntLen = integerNum.length
    for (let i = 0; i < IntLen; i++) {
      const n = integerNum.substr(i, 1)
      const p = IntLen - i - 1
      const q = p / 4
      const m = p % 4
      if (n == '0') {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0]
        }
        //归零
        zeroCount = 0
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q]
      }
    }
    chineseStr += cnIntLast
  }
  //小数部分
  if (decimalNum != '') {
    const decLen = decimalNum.length
    for (let i = 0; i < decLen; i++) {
      const n = decimalNum.substr(i, 1)
      if (n != '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i]
      }
    }
  }
  if (chineseStr == '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger
  } else if (decimalNum == '') {
    chineseStr += cnInteger
  }
  return chineseStr
}

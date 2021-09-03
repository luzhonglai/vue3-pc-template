/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-02-07 14:21:53
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-08-13 23:25:51
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

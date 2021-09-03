function add0(m: any): string {
  return m < 10 ? '0' + m : '' + m
}
//第一个参数是你要转化的小数，第二个是位数
// 3=> 3.00
export function formatNum(value: any, num = 2): string {
  let a = value.toString()
  const b = a.indexOf('.')
  const c = a.length
  if (num == 0) {
    if (b != -1) {
      a = a.substring(0, b)
    }
  } else {
    //如果没有小数点
    if (b == -1) {
      a = a + '.'
      for (let i = 1; i <= num; i++) {
        a = a + '0'
      }
    } else {
      //有小数点，超出位数自动截取，否则补0
      a = a.substring(0, b + num + 1)
      for (let i = c; i <= b + num; i++) {
        a = a + '0'
      }
    }
  }
  return a
}
// Thu Dec 24 2020 23:59:59 GMT+0800 => 2020-10-24
export function dateYmd(date1: any): string {
  const date = new Date(date1)
  const Y = date.getFullYear()
  const M = add0(Number(date.getMonth()) + 1)
  const D = add0(date.getDate())
  return `${Y}-${M}-${D}`
}
// Thu Dec 24 2020 23:59:59 GMT+0800 => 23:59:59
export function dateHsm(date1: any): string {
  const date = new Date(date1)
  const h = date.getHours()
  const s = date.getSeconds()
  const m = date.getMinutes()
  return `${add0(h)}:${add0(s)}:${add0(m)}`
}
// '23:59:59'=>86399  时分秒转为时间戳
export function toStamp(time = '00:00:00'): number {
  const hour = Number(time.split(':')[0])
  const min = Number(time.split(':')[1])
  const sec = Number(time.split(':')[2])
  const s = Number(hour * 3600) + Number(min * 60) + Number(sec)
  return s
}

// 时间戳 转 日期
// 160454260598902=>2020-11-05 10:16:45 时间戳转时间
export function numToDate(num: any): string {
  //时间戳是整数，否则要parseInt转换
  if (num == 0 || num == '') {
    return ''
  }
  const time = new Date(num - 0)
  const y = time.getFullYear()
  const m = time.getMonth() + 1
  const d = time.getDate()
  const h = time.getHours()
  const mm = time.getMinutes()
  const s = time.getSeconds()
  return `${y}-${add0(m)}-${add0(d)} ${add0(h)}:${add0(mm)}:${add0(s)}`
}
// 日期转时间戳
// 2020-11-05 10:16:45=>160454260598902
export function dateToNum(time = ''): string {
  return time == '' || time == null ? '' : new Date(time).getTime() + ''
}

// 日期数组转时间戳数组 只用于开始时间、结束时间
// [2020-11-05 10:16:45,2020-12-05 10:16:45]
// =>[2020-11-05 00:00:00,2020-12-05 23:59:59]
// =>[160454260598902,160454260598902]
export function dateArrToNumArr(timeArr: any): Array<string> {
  if (timeArr == null || timeArr == '') {
    return ['', '']
  } else {
    const beginTime = dateYmd(timeArr[0]) + ' 00:00:00'
    const endTime = dateYmd(timeArr[1]) + ' 23:59:59'
    return [dateToNum(beginTime), dateToNum(endTime)]
  }
}
//日期转当天开始的时间戳-结束的时间戳
// 2020-11-05 10:16:45 => [160454260598902,160454260598902]
export function toBeginEndTime(dayTime: any) {
  if (dayTime == '') {
    return ['', '']
  }
  const beginTime = dateYmd(dayTime) + ' 00:00:00'
  const endTime = dateYmd(dayTime) + ' 23:59:59'
  return [dateToNum(beginTime), dateToNum(endTime)]
}

export function setTime(num: any) {
  const sec: any = num / 1000 //06 秒
  const min: any = ((sec / 60) % 60).toFixed(2) //Math.floor(num / 60) % 60     分
  const hour: any = Math.floor(sec / 60 / 60) % 24 //时
  const day: any = Math.floor(sec / 60 / 60 / 24) //天数
  if (sec == '0') {
    return 0 + '分'
  }
  if (day == '0' && hour == '0') {
    return min + '分'
  } else if (day == '0' && hour !== '0') {
    return hour + '小时' + min + '分'
  } else if (day !== '0' && hour !== '0') {
    return day + '天' + hour + '小时' + min + '分'
  }
}

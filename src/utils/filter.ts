/**
 * @description 注册全局过滤器
 * @param {vue} app 当前应用实例， vue3新特性
 * @returns {value} value
 */

const filters = {
  initFilter(filterName: any, value: any) {
    if (!filterName) return value
    return Object.prototype.toString.call(this[filterName]) == '[object Function]'
      ? this[filterName](value)
      : this[filterName][value]
  },
  //状态-启用/停用
  isDisabledStatus: { '0': '停用', '1': '启用' },
  //站运营态
  stationStatus: { '3': '运行', '10': '停运' },
  //时间段类型
  timePeriodType: { '1': '尖', '2': '峰', '3': '平', '4': '谷' },
  //设备类型
  stakeType: { '1': '直流', '2': '交流' },
  //计费模型下发状态
  issueStatus: { '0': '待下发', '1': '下发中', '2': '下发成功待生效', '-1': '下发失败', '-2': '已解除' },
  //日期格式化
  date: function(dateTime: any, fmt: any) {
    if (dateTime == null || dateTime == 0) return '0'
    if (!fmt) fmt = 'yyyy-MM-dd hh:mm:ss'
    const dateTimeNew = new Date(Number(dateTime))
    const o = {
      'M+': dateTimeNew.getMonth() + 1, //月份
      'd+': dateTimeNew.getDate(), //日
      'h+': dateTimeNew.getHours(), //小时
      'm+': dateTimeNew.getMinutes(), //分
      's+': dateTimeNew.getSeconds(), //秒
      'q+': Math.floor((dateTimeNew.getMonth() + 3) / 3), //季度
      S: dateTimeNew.getMilliseconds() //毫秒
    }

    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (dateTimeNew.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (const k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
      }
    }
    return fmt
  },
  //时长天数、倒计时
  timeNumber: function(dateTime: any) {
    function size(num: number) {
      return num < 10 && num > 0 ? '0' + num : num
    }
    if (Number(dateTime)) {
      let allTime = 0
      if (dateTime == null || Number(dateTime) == 0) {
        allTime = 0
      } else {
        allTime = Number(dateTime)
      }
      if (allTime <= 0) return '0秒'
      const allSecond: number = Math.floor(allTime / 1000)
      const day: any = size(Math.floor(allSecond / 3600 / 24))
      const hour: any = size(Math.floor((allSecond / 3600) % 24))
      const minute: any = size(Math.floor((allSecond / 60) % 60))
      const second: any = size(Math.floor(allSecond % 60))
      let dayStr = ''
      let hourStr = ''
      let minuteStr = ''
      if (Math.floor(allSecond / 3600 / 24) > 0) dayStr = day + '天 '
      if (hour > 0) hourStr = hour + '小时'
      if (minute > 0) minuteStr = minute + '分'
      return dayStr + hourStr + minuteStr + second + '秒'
    } else {
      return dateTime == 0 ? '0秒' : dateTime
    }
  }
}

export default filters

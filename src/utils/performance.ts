/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-08-14 11:21:29
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-09-04 18:41:01
 */

/* --------------------------------- 性能监控试上传 -------------------------------- */

/*
 * 格式化参数
 */
function formatParams(data = {}) {
  const arr: any[] = []
  for (const name in data) {
    arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]))
  }
  return arr.join('&')
}

class Performance {
  private reqStallList: any[] = []
  private options = {
    reportUrl: location.href, // 上报地址
    appId: '', // 项目ID
    appName: '', // 项目名称,
    env: 'dev', // 环境：dev、test、pro
    infoType: 'preformance', // 信息类别
    timeSpan: Date.now(), // 发送数据时的时间戳
    userAgent: navigator.userAgent,
    isSendBeacon: false
  }

  constructor(ops) {
    Object.assign(this.options, ops)

    this.init()
  }
  init() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.delaySetPerformance({
          current: location.href
        })
      })
    })
  }

  delaySetPerformance(obj) {
    this.savePerformanceData(obj)
  }

  async savePerformanceData(obj) {
    const performanceInfo = this.getPerformanceData()
    await Object.assign(performanceInfo, obj, {
      timeSpan: new Date.now()
    })
    this.reqStallList.push(Object.assign({}, this.options, performanceInfo))
    await this.asyncSendReport()
  }

  asyncSendReport() {
    const { isSendBeacon = false, reportUrl = '' } = this.options
    const repDataList = this.reqStallList
    while (repDataList.length > 0) {
      const reqData = repDataList.shift()
      ;((data) => {
        setTimeout(() => {
          this.sendReport(data, reportUrl, isSendBeacon)
        })
      })(reqData)
    }
  }
  sendReport(preformance, reportUrl, isSendBeacon = false) {
    /*     if (isSendBeacon) {
      this.sendBeacon(performance, reportUrl)
      return
    } */
    this.sendImage(performance, reportUrl)
  }

  sendBeacon(preformance, reportUrl) {}
  sendImage(data, reportUrl) {
    const img = new Image()
    img.src = `${reportUrl}?${formatParams(data)}`
  }

  getPerformanceData() {
    const { timing, memory, navigation } = window.performance as any
    const {
      navigationStart = 0, // 准备加载页面的起始时间
      fetchStart = 0, // 开始检查缓存或开始获取资源的时间
      domainLookupStart = 0, //  开始进行dns查询的时间
      domainLookupEnd = 0, //  dns查询结束的时间
      connectStart = 0, // 开始建立连接请求资源的时间
      connectEnd = 0, // 建立连接成功的时间.
      responseStart = 0, // 接收到第一个字节的时间
      responseEnd = 0, // 接收到最后一个字节的时间.
      //   domLoading = 0, // ‘current document readiness’ 设置为 loading的时间 (这个时候还木有开始解析文档)
      domInteractive = 0, // 文档解析结束的时间
      //   domContentLoadedEventStart = 0, // DOMContentLoaded事件开始的时间
      domContentLoadedEventEnd = 0, // DOMContentLoaded事件结束的时间
      domComplete = 0, // current document readiness被设置 complete的时间
      loadEventEnd = 0 // onload事件结束的时间
    } = timing

    // 准备新页面时间耗时
    const prepareNewPageTime = fetchStart - navigationStart
    // DNS查询耗时
    const queryDNSTime = domainLookupEnd - domainLookupStart
    // TCP链接耗时
    const connectionTCPTime = connectEnd - connectStart
    // request请求耗时
    const requestTime = responseEnd - responseStart
    // 解析dom树耗时
    const analysisDOMTime = domComplete - domInteractive
    // 白屏时间
    const whiteScreenTime = responseStart - navigationStart
    // domready时间
    const domReadyTime = domContentLoadedEventEnd - navigationStart
    // onload执行完成时间
    const onloadSuccessTime = loadEventEnd - navigationStart

    return {
      prepareNewPageTime,
      queryDNSTime,
      connectionTCPTime,
      analysisDOMTime,
      whiteScreenTime,
      domReadyTime,
      onloadSuccessTime
    }
  }
}

export default new Performance({
  reportUrl: 'http://localhost:10300/performanceMonitor', // 性能上报地址
  appId: 'performanceMonitor-1559318109525', // 项目ID
  appName: 'performanceMonitor', // 项目名称
  env: 'dev' // 环境：dev、test、prod
})

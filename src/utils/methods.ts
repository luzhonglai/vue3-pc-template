export const exoprtExcel = (response: any, filename: any) => {
  const link = document.createElement('a')
  const blob = new Blob([response], { type: 'application/vnd.ms-excel,charset=utf-8' })
  link.style.display = 'none'
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', filename)
  // link.download = '测试.xlsx' // 下载的文件名
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
//js 乘法函数
//调用：accMul(arg1,arg2)
//返回值：arg1乘以arg2的精确结果
export const accMul = (arg1: any, arg2: any): number => {
  let m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString()
  try {
    m += s1.split('.')[1].length
  } catch (e) {}
  try {
    m += s2.split('.')[1].length
  } catch (e) {}
  return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m)
}
//js 加法计算
//调用：accAdd(arg1,arg2)
//返回值：arg1加arg2的精确结果
export const accAdd = (arg1: number, arg2: number) => {
  let r1: any, r2: any, m: any
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return ((arg1 * m + arg2 * m) / m).toFixed(4)
}
//js 减法计算
//调用：Subtr(arg1,arg2)
//返回值：arg1减arg2的精确结果
export const Subtr = (arg1: number, arg2: number) => {
  let r1: any, r2: any, m: any
  try {
    r1 = arg1.toString().split('.')[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split('.')[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2))
  return ((arg1 * m - arg2 * m) / m).toFixed(4)
}

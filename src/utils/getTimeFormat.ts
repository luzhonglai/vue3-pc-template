/**
 * @name: 格式化时间
 * @msg: 格式化new Date()获取的时间 为yyyy-MM-dd HH:mm:ss
 * @param date new Date()
 */
export const getTimeFormat = (date: Date) => {
  const now = date || new Date()
  const year = now.getFullYear() //年
  const month = now.getMonth() + 1 //月
  const day = now.getDate() //日

  let clock = year + '-'
  if (month < 10) clock += '0'
  clock += month + '-'
  if (day < 10) clock += '0'
  clock += day + ' '
  //if (hh < 10) clock += '0'
  clock += '00:00:00'
  return clock
}

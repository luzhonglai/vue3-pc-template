// @ts-nocheck
export function arrToTree(data: any[]) {
  // 循环数组 找到一个顶级
  //temp为临时对象，将json数据按照id值排序.
  let result = [],
    temp = {},
    len = data.length
  for (let i = 0; i < len; i++) {
    // 以id作为索引存储元素，可以无需遍历直接快速定位元素
    temp[data[i]['id']] = data[i]
  }
  for (let j = 0; j < len; j++) {
    let list = data[j]
    // 临时变量里面的当前元素的父元素，即pid的值，与找对应id值
    let sonlist = temp[list['pId']]
    // 如果存在父元素，即如果有pid属性
    if (sonlist) {
      // 如果父元素没有children键
      if (!sonlist['children']) {
        // 设上父元素的children键
        sonlist['children'] = []
      }
      // 给父元素加上当前元素作为子元素
      sonlist['children'].push(list)
    }
    // 不存在父元素，意味着当前元素是一级元素
    else {
      result.push(list)
    }
  }
  return result
}

/* eslint-disable no-useless-escape */
const validator = {
  pattern: {
    // phone: /^(0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/,
    phone: /^(0|86|17951)?(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/,
    telephone: /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,8}/,
    phoneAndTel: /((0|86|17951)?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}) | (\(\d{3,4}\)|\d{3,4}-|\s)?\d{8}/,
    // idCard: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/,
    idCard: /(^\d{17}([0-9]|X)$)/,
    number: /^\d*$/, // 匹配正整数
    int: /^[1-9]\d*$/, // 匹配正整数
    float: /^[1-9]\d*\.\d*|0\.\d*[1-9]\d*$/, // 匹配正浮点数
    positiveNumber: /^([1-9]\d*\.\d*|0\.\d+|[1-9]\d*|0)$/, // 匹配正数
    enString: /^[a-zA-Z\']*$/,
    enStringNum: /^[a-zA-Z0-9']*$/,
    url: /^https:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=!#]*)?$/,
    email: /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/,
    // plateNumber: /^[\u4e00-\u9fa5]{1}[A-Za-z]{1}[A-Za-z0-9]{4,5}[A-Z0-9挂学警港澳]{1}$/,
    plateNumber: /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/,
    vinNumber: /^[a-hj-npr-z0-9]{8}[0-9xX][a-hj-npr-z0-9]{8}$/,
    partName: /^[\u4e00-\u9fa5a-zA-Z0-9-()Φ*,:]*$/,
    partTypeName: /^[\u4e00-\u9fa5a-zA-Z0-9]*$/,
    partNo: /^[a-zA-Z0-9\-/()=]*$/,
    itemName: /^[^+\/、,，]*$/,
    base64: /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
  },
  text: {
    notNull: '请输入必填项目',
    notNullGreateZero: '请输入大于0数字项',
    name: '请输入正确的姓名',
    phone: '手机号码错误',
    phoneOrTel: '电话号码错误',
    idCard: '身份证号码错误',
    email: '邮箱格式错误',
    url: '请输入正确的网址, 例如: https://www.shuidao.com',
    plateNumber: '检查字母大小写及车牌准确性',
    vinNumber: '请输入正确的车架号',
    itemName: '项目名称不能包含/+、等符号',
    partTypeName: '配件分类只能包含数字、字母和中文',
    partName: '配件名称只能包含数字、字母、中文、-、()、,、:、*、Φ',
    partNo: '配件号只能包含数字、字母、-、/、()、=',
    hasError: '填写的表单内容有误,请检查必填信息或数据格式'
  },
  required: {
    notNull: '必填项',
    notNullGreateZero: '请输入大于0数字项',
    name: '请输入姓名',
    phone: '请填写手机号码',
    phoneAndTel: '请填写手机或固话号码',
    idCard: '请填写身份证号码',
    email: '请填写邮箱地址',
    plateNumber: '请填写正确车牌号',
    vinNumber: '请填写正确车架号',
    partTypeName: '请填写配件分类名称',
    partNo: '请填写配件号',
    partName: '请填写配件名称',
    itemName: '请输入项目名称',
    url: '请填写正确链接',
    int: '请填写整数数字'
  },
  validate(val, reg) {
    if (!reg) {
      return true
    }
    return !!val && !!val.match(reg)
  },

  notNull(val) {
    return val.length > 0
  },
  notNullGreateZero(val) {
    return val.length > 0 && Number(val) > 0
  },
  name(val) {
    return val.length > 1 && val.length < 5 && !this.validate(val, this.pattern.number)
  },
  phone(val) {
    return this.validate(val, this.pattern.phone)
  },
  telephone(val) {
    return this.validate(val, this.pattern.telephone)
  },
  phoneOrTel(val) {
    return this.validate(val, this.pattern.phoneAndTel)
  },
  idCard(val) {
    return this.validate(val, this.pattern.idCard)
  },
  number(val) {
    return this.validate(val, this.pattern.number)
  },
  enNum(val) {
    return this.validate(val, this.pattern.enStringNum)
  },
  cnString(val) {
    return !this.validate(val, this.pattern.enString)
  },
  url(val) {
    return this.validate(val, this.pattern.url)
  },
  email(val) {
    return this.validate(val, this.pattern.email)
  },
  itemName(val) {
    return this.validate(val, this.pattern.itemName)
  },
  partTypeName(val) {
    return this.validate(val, this.pattern.partTypeName)
  },
  partName(val) {
    return this.validate(val, this.pattern.partName)
  },
  partNo(val) {
    return this.validate(val, this.pattern.partNo)
  },
  plateNumber(val) {
    return this.validate(val, this.pattern.plateNumber)
  },
  plateInt(val) {
    return this.validate(val, this.pattern.int)
  },
  /**
   * vin码校验
   * @param vin
   * @desc VIN码从从第一位开始，码数字的对应值×该位的加权值，计算全部17位的乘积值相加除以11，所得的余数，即为第九位校验值
   * @example LGB652E02JS015808 LVZA53P9XJC049741
   * @returns {boolean}
   */
  vinNumber(vin) {
    vin = vin.toLowerCase()
    if (!validator.pattern.vinNumber.test(vin)) {
      return false
    }

    // vin码对应的校验值
    const vinValueMap = {
      '0': 0,
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5,
      '6': 6,
      '7': 7,
      '8': 8,
      '9': 9,
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5,
      f: 6,
      g: 7,
      h: 8,
      j: 1,
      k: 2,
      l: 3,
      m: 4,
      n: 5,
      p: 7,
      r: 9,
      s: 2,
      t: 3,
      u: 4,
      v: 5,
      w: 6,
      x: 7,
      y: 8,
      z: 9
    }
    // vin码对应的权重值
    const vinWeights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2]

    let sum = 0
    for (let i = 0; i < vin.length; i++) {
      sum += vinValueMap[vin.charAt(i)] * vinWeights[i]
    }

    const remainder = sum % 11
    return remainder === 10 ? vin.charAt(8) === 'x' : parseInt(vin.charAt(8)) === remainder
  },

  toDecimal2(num) {
    const numFloat = parseFloat(num)
    if (isNaN(numFloat)) {
      return false
    }
    const numMath = Math.round(num * 100) / 100
    let count = numMath.toString()
    let rs = count.indexOf('.')
    if (rs < 0) {
      rs = count.length
      count += '.'
    }
    while (count.length <= rs + 2) {
      count += '0'
    }
    return count
  },

  /**
   * @return {number}
   */
  getSexOrBirth(UUserCard, num) {
    if (num === 1) {
      // 获取出生日期
      return `${UUserCard.substring(6, 10)}-${UUserCard.substring(10, 12)}-${UUserCard.substring(12, 14)}`
    }
    if (num === 2) {
      // 获取性别
      if (parseInt(UUserCard.substr(16, 1)) % 2 === 1) {
        // 男
        return '男'
      } else {
        // 女
        return '女'
      }
    }
    if (num === 3) {
      // 获取年龄
      const myDate = new Date()
      const month = myDate.getMonth() + 1
      const day = myDate.getDate()
      let age = myDate.getFullYear() - UUserCard.substring(6, 10) - 1
      if (
        UUserCard.substring(10, 12) < month ||
        (UUserCard.substring(10, 12) === month && UUserCard.substring(12, 14) <= day)
      ) {
        age++
      }
      return age
    }
  }
}

export default validator

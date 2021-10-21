/*
 * @Author: your name
 * @Date: 2021-04-02 20:32:42
 * @LastEditTime: 2021-04-03 12:35:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hz-finances\src\utils\library\replace.ts
 */
/**
 * 验证手机号码、含区号固定电话、不含区号固定电话
 * @param {String} tel
 */
export function checkTel(tel: string) {
  const pattern = /(^[0-9]{3,4}-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^[0−9]3,4[0-9]{3,8}$)|(^0{0,1}13[0-9]{9}$)|(^1[0-9]{10}$)/
  if (pattern.test(tel)) {
    return true
  } else {
    return false
  }
}
/**
 * 验证身份证
 * @param {string} code
 */
export const checkIdCard = (idcode: string) => {
  // 加权因子
  const weightFactor: number[] = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
  // 校验码
  const checkCode: string[] = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']

  const code = idcode + ''
  const last = idcode[17]// 最后一位
  const seventeen = code.substring(0, 17)

  // ISO 7064:1983.MOD 11-2
  // 判断最后一位校验码是否正确
  const arr: string[] = seventeen.split('')
  const len = arr.length
  let num = 0
  for (let i = 0; i < len; i++) {
    num = num + parseInt(arr[i]) * weightFactor[i]
  }

  // 获取余数
  const resisue = num % 11
  const lastNo = checkCode[resisue]

  // 格式的正则
  // 正则思路
  /*
    第一位不可能是0
    第二位到第六位可以是0-9
    第七位到第十位是年份，所以七八位为19或者20
    十一位和十二位是月份，这两位是01-12之间的数值
    十三位和十四位是日期，是从01-31之间的数值
    十五，十六，十七都是数字0-9
    十八位可能是数字0-9，也可能是X
    */
  const idcardPatter = /^[1-9][0-9]{5}([1][9][0-9]{2}|[2][0][0|1][0-9])([0][1-9]|[1][0|1|2])([0][1-9]|[1|2][0-9]|[3][0|1])[0-9]{3}([0-9]|[X])$/

  // 判断格式是否正确
  const format = idcardPatter.test(idcode)

  // 返回验证结果，校验码和格式同时正确才算是合法的身份证号码
  return !!(last === lastNo && format)
}

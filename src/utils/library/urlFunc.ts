/*
 * @Author: your name
 * @Date: 2021-04-01 09:25:26
 * @LastEditTime: 2021-04-03 13:12:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hz-finances\src\utils\library\urlFunc.ts
 */
/**
 * @Description: 解析地址栏中的参数
 * @param  key 不传则返回所有参数；传key则返回key值对应的参数，若没有key对应大参数则返回undefined
 */
interface IReturnObj {
  [propName: string]: string
}
export function getWindowParams(key?: keyof IReturnObj): { [key: string]: string } | string {
  const afterUrl = window.location.hash.split('?')// (问号以后的字符串)
  debugger
  const afterEqual = afterUrl[1] ? afterUrl[1].split('&') : [] // afterUrl.split("&");

  const returnObj: IReturnObj = {}
  console.time()
  afterEqual.forEach((item: string) => {
    const arr: string[] = item.split('=')
    returnObj[arr[0]] = arr[1]
  })
  console.timeEnd()
  if (key && returnObj[key]) {
    return returnObj[key]
  }
  console.log(returnObj)

  return returnObj
}

/**
 * 删除当前url中指定参数
 * @param names 数组或字符串
 * @returns {string}
 */
export const delParam = (paramKey: string): string => {
  let url = window.location.href // 页面url
  const urlParam = window.location.search.substr(1) // 页面参数
  const beforeUrl = url.substr(0, url.indexOf('?')) // 页面主地址（参数之前地址）
  let nextUrl = ''

  const arr = []
  if (urlParam !== '') {
    const urlParamArr = urlParam.split('&') // 将参数按照&符分成数组
    for (let i = 0; i < urlParamArr.length; i++) {
      const paramArr = urlParamArr[i].split('=') // 将参数键，值拆开
      // 如果键雨要删除的不一致，则加入到参数中
      if (paramArr[0] !== paramKey) {
        arr.push(urlParamArr[i])
      }
    }
  }
  if (arr.length > 0) {
    nextUrl = '?' + arr.join('&')
  }
  url = beforeUrl + nextUrl
  return url
}
/**
 * @Description: 解析地址栏中的参数
 * @param  key 不传则返回所有参数；传key则返回key值对应的参数，若没有key对应大参数则返回undefined
 */
export const analysisUrl = (key: string) => {
  const afterUrl = window.location.search.substring(1)// (问号以后的字符串)
  const afterEqual = afterUrl.split('&')
  const datas: any = {}
  for (const item of afterEqual) {
    const arr: string[] = item.split('=')
    if (arr && arr[0]) {
      datas[arr[0]] = arr[1] || undefined
    }
  }
  if (key) {
    return datas[key]
  } else {
    return datas
  }
}

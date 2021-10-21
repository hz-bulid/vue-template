/*
 * @Description:全局选择时间范围
 * @Autor: Chen
 * @Date: 2021年3月29日
 * @LastEditors: Please set LastEditors
 * @LastEditTime:2021年3月29日
 */
type IgetTimesParams = 'lastDay' | 'day' | 'week' | 'month' | 'lastMonth' | 'middleMonth' | 'threeMonth' | 'lastYear' | 'middleYeal' | 'year' | 'fiveYear';
export function formatDateYMD(value: Date | string | number) {
  if (!value) {
    return '- -'
  }
  const date = new Date(value)
  const y = date.getFullYear()
  let MM: number | string = date.getMonth() + 1
  MM = MM < 10 ? '0' + MM : MM
  let d: number | string = date.getDate()
  d = d < 10 ? '0' + d : d
  return y + '-' + MM + '-' + d
}
// 根据传入值返回时间范围

export function getTimes(type: IgetTimesParams, v: Date = new Date()) {
  type ItimeValue = {
    lastDay: string
    today: string
    weekStart: string
    monthStart: string
    lastMonthSatrt: string
    lastMonthEnd: string
    middleMonth: string // 半月
    threeMonth: string
    middleYeal: string
    year: string
    lastYear: string
    fiveYear: string
  }
  type Istr = keyof ItimeValue
  type IstrArr = Istr[]
  type ItimeType = {
    lastDay: IstrArr
    day: IstrArr
    week: IstrArr
    month: IstrArr
    lastMonth: IstrArr
    middleMonth: IstrArr
    threeMonth: IstrArr
    lastYear: IstrArr
    middleYeal: IstrArr
    year: IstrArr
    fiveYear: IstrArr
  }

  const typeYearChange: string[] = ['threeMonth', 'middleYeal']
  // 获取一天经过的时间
  const timeDayLong: number = 24 * 60 * 60 * 1000
  // 获取传进来的日期的时间戳
  const nowTime: number = v.getTime()
  // 获取年份
  let year: number = v.getFullYear()
  // 月份
  const month: number = v.getMonth() + 1
  // 日期 1-31
  const day: number = v.getDate()
  // 当前星日数 0-6
  const toDayWeek: number = v.getDay() || 7
  // 获取星期差 周一到周三这种
  const mTime: number = nowTime - (toDayWeek - 1) * timeDayLong
  // 申明返回的数组
  const timeArr: string[] | ItimeValue = []
  // const monthEnd: number = v.getDay();
  // 当月份是3月或者半年的时候 并且传进来的参数也是半年,三个月就把当前年份-1
  // 因为这个时候要找的年份是去年 2020-10 2020-01 这种
  if (month - 3 < 0 || month - 6 < 0) {
    if (typeYearChange.includes(type)) {
      year = year - 1
    }
  }
  // 把所以的选择类型枚举出来 然后再里面找值
  const dayType: ItimeType = {
    lastDay: ['lastDay', 'today'],
    day: ['today', 'today'],
    week: ['weekStart', 'today'],
    month: ['monthStart', 'today'],
    lastMonth: ['lastMonthSatrt', 'lastMonthEnd'],
    middleMonth: ['middleMonth', 'today'],
    threeMonth: ['threeMonth', 'today'],
    lastYear: ['lastYear', 'today'],
    middleYeal: ['middleYeal', 'today'],
    year: ['year', 'today'],
    fiveYear: ['fiveYear', 'today']
  }
  const timeValue: ItimeValue = {
    lastDay: formatDateYMD(new Date(v.getTime() - timeDayLong)),
    today: formatDateYMD(new Date()),
    weekStart: formatDateYMD(new Date(mTime)),
    monthStart: formatDateYMD(new Date(v.setDate(1))),
    lastMonthSatrt: formatDateYMD(new Date(formatDateYMD(new Date(formatDateYMD(new Date(v.setDate(1)))).getTime() - 1 * 24 * 3600 * 1000)).setDate(1)),
    lastMonthEnd: formatDateYMD(new Date(formatDateYMD(new Date(v.setDate(1)))).getTime() - 1 * 24 * 3600 * 1000),
    middleMonth: formatDateYMD(nowTime - 24 * 60 * 60 * 1000 * 14), // 半月
    threeMonth: formatDateYMD(new Date(year + '-' + (Math.abs(month - 2)) + '-' + day)),
    middleYeal: formatDateYMD(new Date(year + '-' + (Math.abs(month - 5)) + '-' + day)),
    year: formatDateYMD(new Date(year + '-' + 1 + '-' + 1)),
    lastYear: formatDateYMD(new Date(((year) - 1) + '-' + month + '-' + day)),
    fiveYear: formatDateYMD(new Date(((year) - 4) + '-' + 1 + '-' + 1))
  }
  if (dayType[type]) {
    dayType[type].forEach((item: Istr) => {
      timeArr.push(timeValue[item])
    })
  }
  return timeArr
}

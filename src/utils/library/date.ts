interface IYy {
  day: Date;
}
interface IItem {
  yi: Date[],
  er: Date[],
  san: Date[],
  si: Date[],
  wu: Date[],
  liu: Date[],
  ri: Date[],
}
const formatDate = (year: number | Date, month: number | string | Date, day: number | string | Date): string | Date => {
  const y = year
  let m = month
  if (m < 10) m = '0' + m
  let d = day
  if (d < 10) d = '0' + d
  return y + '-' + m + '-' + d
}
export function dateData(): IItem {
  // const date = new Date()
  const now = new Date()
  const date = new Date(formatDate(now.getFullYear(), now.getMonth(), 1))
  const year: number = date.getFullYear()
  let m; let d; let dayNum = 0; const result = ''
  let day
  const item: IItem = {
    yi: [],
    er: [],
    san: [],
    si: [],
    wu: [],
    liu: [],
    ri: []
  }

  for (m = 1; m <= 12; m++) {
    switch (m) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        dayNum = 31
        break
      case 4:
      case 6:
      case 9:
      case 11:
        dayNum = 30
        break
      case 2:
        if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
          dayNum = 29
        } else {
          dayNum = 28
        }
        break
    }
    for (d = 1; d <= dayNum; d++) {
      date.setMonth(m - 1, d)
      day = date.getDay()
      switch (day) {
        case 1:
          item.yi.push(new Date(date))
          // console.log(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())
          // result += '周1' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '<br/>'
          break
        case 2:
          item.er.push(new Date(date))
          // result += '周2' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '<br/>'
          break
        case 3:
          item.san.push(new Date(date))
          // result += '周3' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '<br/>'
          break
        case 4:
          item.si.push(new Date(date))
          // result += '周4' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '<br/>'
          break
        case 5:
          item.wu.push(new Date(date))
          // result += '周5' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '<br/>'
          break
        case 6:
          item.liu.push(new Date(date))
          // result += '周六' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '<br/>'
          break
        case 0:
          item.ri.push(new Date(date))
          // result += '周日' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + '<br/>'
          break
        default:
      }
    }
  }
  return item
}

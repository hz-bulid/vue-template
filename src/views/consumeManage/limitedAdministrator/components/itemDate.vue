<template>
  <div id="calendar">
    <!-- 年份 月份 -->
    <div class="month">
      <ul>
        <!--点击会触发pickpre函数，重新刷新当前日期 @click(vue v-on:click缩写) -->
        <!-- <li class="arrow" @click="pickPre(currentYear, currentMonth)">&lt;</li> -->
        <li class="year-month">
          <span class="choose-year">{{ currentYear }}年</span>
          <span class="choose-month">{{ currentMonth }}月</span>
        </li>
        <!-- <li class="arrow" @click="pickNext(currentYear, currentMonth)">&gt;</li> -->
      </ul>
    </div>
    <!-- 星期 -->
    <ul class="weekdays">
      <li>天</li>
      <li>一</li>
      <li>二</li>
      <li>三</li>
      <li>四</li>
      <li>五</li>
      <li>六</li>
    </ul>
    <!-- 日期 -->
    <ul class="days">
      <!-- 核心 v-for循环 每一次循环用<li>标签创建一天 -->
      <li v-for="(dayobject, i) in days" :key="i">
        <!--本月-->
        <!--如果不是本月  改变类名加灰色-->
        <span
          v-if="dayobject.getMonth() + 1 != currentMonth"
          class="other-month"
          @click="getDayTime(dayobject)"
          >{{ dayobject.getDate() }}</span
        >
        <!--如果是本月  还需要判断是不是这一天-->
        <span v-else>
          <!--今天  同年同月同日-->
          <!-- <span
            v-if="
              dayobject.day.getFullYear() == new Date().getFullYear() &&
              dayobject.day.getMonth() == new Date().getMonth() &&
              dayobject.day.getDate() == new Date().getDate()
            "
            class="active"
            @click="getDayTime(dayobject.day)"
            >{{ dayobject.day.getDate() }}</span
          > -->

          <span
            :class="{
              active:
                JSON.stringify(dateFormat).indexOf(
                  JSON.stringify(dayobject)
                ) !== -1
                  ? true
                  : false,
            }"
            @click="getDayTime(dayobject)"
            >{{ dayobject.getDate() }}</span
          >
        </span>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, onMounted, watch, PropType } from 'vue'
import userApi from '@/api/login'
import limitedConsumption from '@/api/limitedAdministrator/limitedAdministrator.ts'
type cityOptions = '周一' | '周二' | '周三' | '周四' | '周五' | '周六' | '周日';
type cityType = cityOptions[]
interface IItem {
  yi: Date[],
  er: Date[],
  san: Date[],
  si: Date[],
  wu: Date[],
  liu: Date[],
  ri: Date[],
}

export default defineComponent({
  name: 'itemDate',
  props: {
    currentYears: {
      type: Number,
      default: 2021
    },
    currentMonths: {
      type: Number,
      default: 1
    },
    timeDate: {
      type: Object as PropType<IItem>,
      default: {}
    },
    checkedCities: {
      type: Array as PropType<cityType>,
      default: []
    },
    checkedDate: {
      type: Array as PropType<number[]>,
      default: []
    },
    isBool: {
      type: Boolean,
      default: true
    }
  },
  setup(props, context) {
    interface ITimeDate {
      yi: Date[],
      er: Date[],
      san: Date[],
      si: Date[],
      wu: Date[],
      liu: Date[],
      ri: Date[]
    }

    interface IDatas {
      currentDay: number|Date,
      currentMonth: number|Date,
      currentYear: number|Date,
      currentWeek: number|Date,
      days: Date[],
      dateFormat: Date[]
    }
    const datas = reactive<IDatas>({
      currentDay: 1,
      currentMonth: 1,
      currentYear: 2021,
      currentWeek: 1,
      days: [],
      dateFormat: [],
    })

    // for (const key in props.timeDate) {
    //   props.timeDate[key].forEach((element) => {
    //     // console.log(element)
    //     datas.dateFormat.push(element)
    //   })
    // }
    // 返回 类似 2016-01-02 格式的字符串
    const formatDate = (year:number|Date, month:number|string|Date, day:number|string|Date):string|Date => {
      const y = year
      let m = month
      if (m < 10) m = '0' + m
      let d = day
      if (d < 10) d = '0' + d
      return y + '-' + m + '-' + d
    }
    const initData = (cur:null|Date|string) => {
      // let leftcount = 0 // 存放剩余数量
      let date
      if (cur) {
        date = new Date(cur)
      } else {
        const now = new Date()
        const d = new Date(formatDate(now.getFullYear(), now.getMonth(), 1))
        d.setDate(35)
        date = new Date(formatDate(d.getFullYear(), d.getMonth() + 1, 1))
      }
      datas.currentDay = date.getDate()
      datas.currentYear = date.getFullYear()
      datas.currentMonth = date.getMonth() + 1
      datas.currentWeek = date.getDay() // 1...6,0
      if (datas.currentWeek === 0) {
        datas.currentWeek = 7
      }
      const str = formatDate(
        datas.currentYear,
        datas.currentMonth,
        datas.currentDay
      )
      datas.days.length = 0
      // 今天是周日，放在第一行第7个位置，前面6个
      // 初始化本周
      for (let i = datas.currentWeek; i >= 0; i--) {
        const d2 = new Date(str)
        d2.setDate(d2.getDate() - i)
        const dayobjectSelf:Date = d2 // 用一个对象包装Date对象  以便为以后预定功能添加属性
        datas.days.push(dayobjectSelf) // 将日期放入data 中的days数组 供页面渲染使用
      }
      // 其他周
      for (let j = 1; j <= 35 - datas.currentWeek; j++) {
        const d3 = new Date(str)
        d3.setDate(d3.getDate() + j)
        const dayobjectOther:Date = d3
        datas.days.push(dayobjectOther)
      }
    }
    // 清除事件
    const add = (is:any):void => {
      // 传过来的值判断
      if (props.isBool) {
        const dateData = JSON.parse(JSON.stringify(datas.dateFormat))
        for (let index = datas.dateFormat.length; index >= 0; index--) {
          const element = datas.dateFormat[index]
          is.forEach((elements:any, indexs:number):void => {
            if (JSON.stringify(element) === (JSON.stringify(elements))) {
              // 清除
              dateData.splice(index, 1)
            }
          })
        }
        datas.dateFormat = dateData
      }
    }
    // 清除 添加 1表示添加  0表示清除
    const keey = (element:any, is = 0) => {
      switch (element) {
        case '周一':
          if (is === 1) {
            add(props.timeDate.yi)
          } else {
            add(props.timeDate.yi)
            props.timeDate.yi.forEach((elements:Date) => {
              // 判断数组中是否有了
              JSON.stringify(datas.dateFormat).indexOf(JSON.stringify(elements)) === -1 && datas.dateFormat.push(new Date(elements))
            })
          }
          break
        case '周二':
          if (is === 1) {
            add(props.timeDate.er)
          } else {
            props.timeDate.er.forEach((elements:Date) => {
              JSON.stringify(datas.dateFormat).indexOf(JSON.stringify(elements)) === -1 && datas.dateFormat.push(new Date(elements))
            })
          }
          break
        case '周三':
          if (is === 1) {
            add(props.timeDate.san)
          } else {
            props.timeDate.san.forEach((elements:Date) => {
              datas.dateFormat.push(new Date(elements))
            })
          }
          break
        case '周四':
          if (is === 1) {
            add(props.timeDate.si)
          } else {
            props.timeDate.si.forEach((elements:Date) => {
              datas.dateFormat.push(new Date(elements))
            })
          }
          break
        case '周五':
          if (is === 1) {
            add(props.timeDate.wu)
          } else {
            props.timeDate.wu.forEach((elements:Date) => {
              datas.dateFormat.push(new Date(elements))
            })
          }
          break
        case '周六':
          if (is === 1) {
            add(props.timeDate.liu)
          } else {
            props.timeDate.liu.forEach((elements:Date) => {
              datas.dateFormat.push(new Date(elements))
            })
          }
          break
        case '周日':
          if (is === 1) {
            add(props.timeDate.ri)
          } else {
            props.timeDate.ri.forEach((elements:Date) => {
              datas.dateFormat.push(new Date(elements))
            })
          }
          break
        default:
          break
      }
      context.emit('dateFormats', datas.dateFormat)
    }
    // 点击的时候选中
    const getDayTime = (el:any):void => {
      // 点击的时候修改让他不触发watch
      context.emit('update:isBool', false)
      // 判断是否有这个
      const bool = JSON.stringify(datas.dateFormat).indexOf(JSON.stringify(el))
      let indexs = 0
      // 转换时间戳去比较所在位置的下标删除
      for (let index = 0; index < datas.dateFormat.length; index++) {
        const element:any = datas.dateFormat[index]
        if (JSON.stringify(element) === JSON.stringify(el)) {
          indexs = index
          break
        }
      }
      if (bool === -1) {
        datas.dateFormat.push(new Date(el))
      } else {
        datas.dateFormat.splice(indexs, 1)
      }
      // 点击的时候去修改他的选中状态
      var riqi = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
      var weekDate = el.getDay()
      switch (riqi[weekDate]) {
        case '周一':
          context.emit('update:checkedCities', props.checkedCities.filter((item) => { return item !== '周一' }))
          break
        case '周二':
          context.emit('update:checkedCities', props.checkedCities.filter((item) => { return item !== '周二' }))
          break
        case '周三':
          context.emit('update:checkedCities', props.checkedCities.filter((item) => { return item !== '周三' }))
          break
        case '周四':
          context.emit('update:checkedCities', props.checkedCities.filter((item) => { return item !== '周四' }))
          break
        case '周五':
          context.emit('update:checkedCities', props.checkedCities.filter((item) => { return item !== '周五' }))
          break
        case '周六':
          context.emit('update:checkedCities', props.checkedCities.filter((item) => { return item !== '周六' }))
          break
        case '周日':
          context.emit('update:checkedCities', props.checkedCities.filter((item) => { return item !== '周日' }))
          break
        default:
          break
      }
      context.emit('dateFormats', datas.dateFormat)
    }
    const pickPre = (year:number, month:number):void => {
      // setDate(0); 上月最后一天
      // setDate(-1); 上月倒数第二天
      // setDate(dx) 参数dx为 上月最后一天的前后dx天
      const d:Date = new Date(formatDate(year, month, 1))
      d.setDate(0)
      initData(formatDate(d.getFullYear(), d.getMonth() + 1, 1))
    }
    initData(null)
    onMounted(() => {
      pickPre(props.currentYears, props.currentMonths)
    })
    watch(() => props.checkedCities, (v:any, c:any):void => {
      // 当他是点击的日期的时候让他不触发
      if (props.isBool) {
        v.forEach((element:any):void => {
          keey(element, 0)
        })
      }
      new Set(v.concat(c)).forEach((element:any):void => {
        if (!v.includes(element)) {
          keey(element, 1)
        }
      })
      context.emit('update:isBool', true)
    }, {
      immediate: true, // 绑定时加载
    })
    const addtimeDateGet = async () => {
      const res = await limitedConsumption.timeDatecx({ jgh: 420100131, kxfrq: new Date() })
      res.data.forEach((element:any) => {
        datas.dateFormat.push(new Date(element.kxfrq))
      })
    }
    addtimeDateGet()
    return {
      ...toRefs(datas),
      formatDate,
      initData,
      getDayTime
    }
  }
})
</script>

<style lang="scss" scoped>
#calendar {
  font-size: 12px;
  width: 100%;
  margin: 0 auto;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.1),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.month {
  width: 100%;
  color: #333333;
}
.month ul {
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  height: 35px;
}
.year-month {
  display: flex;
  align-items: center;
  /* justify-content: space-around; */
  text-align: center;
  margin-top: 10px;
}
.choose-month {
  text-align: center;
  font-size: 12px;
}
.arrow {
  padding: 15px;
  color: #999999;
}

.month ul li {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 3px;
}
.weekdays {
  margin: 0;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  color: #999;
  justify-content: space-around;
}
.weekdays li {
  display: inline-block;
  width: 13.6%;
  text-align: center;
}
.days {
  padding: 10px;
  background: #ffffff;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
}
.days li {
  list-style-type: none;
  display: inline-block;
  width: 14.2%;
  text-align: center;
  padding-bottom: 4px;
  padding-top: 1px;
  font-size: 12px;
  height: 30px;
  color: #000;
}
.days li .active {
  padding: 4px 8px;
  border-radius: 50%;
  background: #388ff3;
  color: #fff;
}
.days li .other-month {
  padding: 5px;
  color: gainsboro;
}
.days li:hover > span > span {
  padding: 6px 10px;
  border-radius: 50%;
  background: #e1e1e1;
  color: #fff;
}
</style>

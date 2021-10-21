<template>
  <div class="heightall">
    <div class="details-box">
      <div class="details-title">
        <span>订单状态:</span>
        <span class="ztclass">{{ztTitle}}</span>
        <!-- <div>已完成</div> -->
      </div>
      <div class="details-smallbox">
        <div class="details-list">
          <h5>消费信息</h5>
          <div class="details-item">
            <div class="title-top">
              <div>姓名:<span class="leftSpan">{{ rowlist.xm }}</span></div>
              <div>监室号:<span class="leftSpan">{{ rowlist.jsh }}</span></div>
            </div>
            <div class="title-top">
              <div>消费类型:<span class="leftSpan">{{ rowlist.xflxvalue }}</span></div>
              <div>消费金额:<span class="leftSpan">{{ rowlist.xfje }}</span></div>
              <div>当前余额:<span class="leftSpan">{{ rowlist.xfye }}</span></div>
            </div>
          </div>
        </div>
        <div class="table_box centerTable">
          <h-table
            :data="spendingList"
            border
            stripe
            height="100%"
            style="width: 100%"
            size="mini"
            class="table"
          >
            <h-table-column
              v-for="(item, index) in spendingColumns"
              show-overflow-tooltip
              :prop="item.prop"
              :label="item.label"
              :key="index"
            ></h-table-column>
          </h-table>
        </div>
        <!--  -->
        <div
          class="details-list"
          v-for="(item, index) in detailslist"
          :key="index"
        >
          <h5>
            {{ item.sjmc }}<span>{{ item.fssj }}</span>
          </h5>
          <div class="details-item" v-if="item.sjmc === '管教审批'">
            <div class="title-top">
              <div>审批人:<span class="leftSpan">{{ item.xm }}</span></div>
              <div>审批结果:<span class="leftSpan">{{ item.spjg }}</span></div>
            </div>
            <div class="title-top">审批意见:<span class="leftSpan">{{ item.spyj }}</span></div>
          </div>
          <div class="details-item" v-if="item.sjmc === '大领导审批'">
            <div class="title-top">
              <div>审批人:<span class="leftSpan">{{ item.xm }}</span></div>
              <div>审批结果:<span class="leftSpan">{{ item.spjg }}</span></div>
            </div>
            <div class="title-top">审批意见:<span class="leftSpan">{{ item.spyj }}</span></div>
          </div>
          <div class="details-item" v-if="item.sjmc === '备货信息'">
            <div class="title-top">
              <div>备货单号:<span class="leftSpan">{{ item.bhdh }}</span></div>
              <div>备货单位:<span class="leftSpan">{{ item.jsh }}</span></div>
            </div>
            <div class="title-top">备货人:<span class="leftSpan">{{ item.xm }}</span></div>
          </div>
          <div class="details-item" v-if="item.sjmc === '发货信息'">
            <div class="title-top">
              <div>发货人:<span class="leftSpan">{{ item.xm }}</span></div>
              <div>发货单位:<span class="leftSpan">{{ item.jsh }}</span></div>
            </div>
            <div class="title-top">备注:<span class="leftSpan">{{ nr }}</span></div>
          </div>
          <div class="details-item" v-if="item.sjmc === '收货信息'">
            <div class="title-top">
              <div>收货人:<span class="leftSpan">{{ item.xm }}</span></div>
            </div>
            <div class="title-top">备注:<span class="leftSpan">{{ item.nr }}</span></div>
          </div>
          <!--  -->
        </div>
        <!--  -->
        <!-- <div class="details-list">
        <h5>管教审批<span>2020-01-10</span></h5>
        <div class="details-item">
          <div class="title-top">
            <div>审批人:张三</div>
            <div>审批结果:0201</div>
          </div>
          <div class="title-top">
            审批意见:xxxxxxxxxx
          </div>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, PropType, watch } from 'vue'
import ConsumerOrderFinance from '@/api/consumerOrderFinance/consumerOrderFinance'
// import { Iedit } from '@/api/model/consumerOrderFinance'
interface Iedit{
  id:any,
  jgh: string, // 机构号 ,
  list: string[], // (Array[string], optional): id数组/监室号数组 ,
  rybh: string, // 人员编号 ,
  spjg: string, // 审批结果 1同意 2不同意 一定要传 ,
  spyj: string, // 审批意见 ,
  zt: string, // 状态 管教审批2 所领导3
  xm?:string
}
interface IList {
  bhd:string
  ddzt:string
  dqye:string
  id:string
  index: number
  jsh: string
  list: any[]
  nr:any[]
  pageNum: number
  pageSize: number
  rybh: string
  total:number
  xdsj: string
  xfje: string
  xflx: string
  xm: string
}
export default defineComponent({
  props: {
    id: {
      type: String,
      default: ''
    },
    row: {
      type: Object as PropType<IList[]>,
      default: []
    },
  },
  setup(props) {
    interface INspendingColumns{
      prop:string,
      label:string,
    }
    interface INspendingList{
      spmc:string,
      jg:string,
      gg:string,
      sl:string,
      je:string
    }
    interface Idetailslist{
      namekey:string,
      name:string,
      jshname:string,
      jsh:string,
      shenpiname:string,
      shenpi:string,
      titlename:string,
      data:string,
    }
    interface IDatas{
      spendingList:INspendingList[],
      spendingColumns:INspendingColumns[],
      detailslist:Idetailslist[],
      editdata:Iedit,
      id:any,
      rowlist:
      {
        xm:string,
        jsh:string,
        xflxvalue:string,
        xfje:string,
        dqye:string
      },
      ztTitle:string,
    } // spendingList
    const datas = reactive<IDatas>({
      spendingList: [],
      detailslist: [],
      spendingColumns: [
        {
          prop: 'spmc',
          label: '名称'
        },
        {
          prop: 'jg',
          label: '单价'
        },
        {
          prop: 'je',
          label: '金额'
        },
        {
          prop: 'gg',
          label: '规格'
        },
        {
          prop: 'sl',
          label: '数量'
        }
      ],
      editdata: {
        id: props.id,
        jgh: '420100131', // 机构号 ,
        list: [], // (Array[string], optional): id数组/监室号数组 ,
        rybh: '', // 人员编号 ,
        spjg: '', // 审批结果 1同意 2不同意 一定要传 ,
        spyj: '', // 审批意见 ,
        zt: '', // 状态 管教审批2 所领导3 备货4 发货5 完成6 取消8
      },
      id: '', // 审批
      rowlist: {
        xm: '',
        jsh: '',
        xflxvalue: '',
        xfje: '',
        dqye: ''
      },
      ztTitle: ''
    })
    watch(() => props.row, (v:any):void => {
      console.log('🚀 ~ file: consumptionOrderDetails.vue ~ line 229 ~ watch ~ v', v)
      datas.rowlist.xm = v.xm
      datas.rowlist.jsh = v.jsh
      datas.rowlist.xflxvalue = v.xflxvalue
      console.log('🚀 ~ file: consumptionOrderDetails.vue ~ line 235 ~ watch ~ v.xflxvalue', v.xflxvalue)
      datas.rowlist.xfje = v.xfje
      datas.rowlist.dqye = v.dqye
      datas.ztTitle = v.ddztValue
    }, {
      immediate: true, // 绑定时加载
    })
    // 详情

    const orderDetailListData = async () => {
      datas.editdata.id = datas.editdata.id.toString()
      const res = await ConsumerOrderFinance.orderDetailList(
        datas.editdata
      )
      datas.detailslist = res.data
    }
    // 小表格
    orderDetailListData()
    const shopDetailListAll = async () => {
      const idnew = props.id
      datas.id = idnew
      const res = await ConsumerOrderFinance.shopDetailList({
        id: datas.id
      })
      datas.spendingList = res.data
    }
    shopDetailListAll()
    return {
      ...toRefs(datas),
    }
  }
})
</script>

<style lang="scss" spoced>

.heightall {
  height: 100%;
  overflow: hidden;
  line-height: 20px;
  .centerTable{
    margin-top: 20px;
    margin-bottom: 20px;
    .h-table thead tr th{
      background:rgb(246, 248, 250);
    }
  }
  .h-table__body-wrapper{
    height:100% !important;
  }
  .leftSpan{
    margin-left: 20px;
  }

.details-box {
  width: 100%;
  height: 100%;
  overflow: auto;
  text-align: left;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  .details-title {
    width: 100%;
    font-size:16px;
    .ztclass{
      font-size:14px;
    color:#60a5f5;
    margin-left: 10px;
  }
  }
  .details-smallbox {
    display: flex;
    flex-direction: column;
    .details-list {
      width: 100%;
      h5 {
        line-height: 60px !important;
        border-bottom: 1px solid #eee !important;
        span{
          margin-left:20px;
        }
      }
      .details-item {
        width: 90%;
        margin: auto;
        display: flex;
        flex-direction: column;
        line-height: 30px;
        .title-top {
          display: flex;
          flex-direction: row;
          div {
            width: 50%;
          }
        }
      }
    }
  }
}
}
</style>

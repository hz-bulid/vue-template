<template>
<!-- 审批弹框 Approval -->
<div>
  <div class="details-box">
    <div class="details-smallbox">
      <div  class="details-list">
        <h5>被监管人员</h5>
        <div class="details-item">
          <div class="title-top">
            <div>姓名:张三</div>
            <div>监室号:0201</div>
          </div>
        </div>
      </div>
      <div  class="details-list">
        <h5>消费信息</h5>
        <div class="details-item">
          <div class="title-top">
            <div>消费时间:2021-04-06 11:30:20</div>
            <div>消费类型:购物消费</div>
          </div>
          <div class="title-top">
            <div>消费金额:300</div>
            <div>当前余额:100</div>
          </div>
        </div>
      </div>
      <!-- <div class="details-list" v-for="(item,index) in detailslist" :key="index">
        <h5>{{item.titlename}} <span>{{item.data}}</span></h5>
        <div class="details-item">
          <div class="title-top">
            <div>{{item.namekey}}:{{item.name}}</div>
            <div>{{item.jshname}}:{{item.jsh}}</div>
          </div>
          <div class="title-top">
            {{item.shenpiname}}:{{item.shenpi}}
          </div>
        </div>
      </div> -->
      <div class="table_box">
        <div class="tableTitle">本月消费额度:500</div>
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
      <div class="details-list">
        <h5>管教审批</h5>
        <div class="details-item">
          <div class="title-top">
            <div>审批人:张三</div>
            <div>审批结果:同意</div>
          </div>
          <div class="title-top">
            审批意见:xxxxxxxxxx
          </div>
        </div>
      </div>
      <div class="details-list">
        <h5>管教审批</h5>
        <h-form :inline="true" :model="formInline"  ref="numberValidateFormRef" class="rest-from">
        <h-form-item label="审批意见" prop="user">
          <h-input v-model="formInline.user" placeholder="审批意见" type="textarea" :autosize="{ minRows: 2}"></h-input>
        </h-form-item>
        <h-form-item class="footer">
          <h-button type="primary" size="mini" @click="onSubmit">通过</h-button>
          <h-button size="mini" @click="cancel">拒绝</h-button>
        </h-form-item>
        <!-- <div class="details-item">
          <div class="title-top">
            <div>姓名:张三</div>
            <div>监室号:0201</div>
          </div>
          <div class="title-top">
            审批意见:xxxxxxxxxx
          </div>
        </div> -->
        </h-form>
      </div>
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'

export default defineComponent({
  props: {
    id: {
      type: Number
    },
    row: {
      type: Object
    },
    batchShow: {
      type: Boolean
    }
  },
  setup(props) {
    console.log(props.id)
    console.log(props)
    interface INspendingColumns{
      prop:string,
      label:string,
    }
    interface INspendingList{
      name:string,
      price:string,
      type:string,
      num:string,
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
    // 表单
    interface IFormInline {
      user: string,
      region: string,
      value1: string,
      jsh:string
    }
    interface IDatas{
      spendingList:INspendingList[],
      spendingColumns:INspendingColumns[],
      detailslist:Idetailslist[],
      formInline: IFormInline,
    } // spendingList
    const datas = reactive<IDatas>({
      spendingList: [
        {
          name: '苹果',
          price: '2.5',
          type: '个',
          num: '5'
        },
        {
          name: '方便面',
          price: '2.5',
          type: '个',
          num: '5'
        }
      ],
      detailslist: [
        { namekey: '姓名', name: '张三', jshname: '监室号', jsh: '0102', shenpiname: '审批意见', shenpi: '通过了', titlename: '审批状态', data: '2020-10-11' },
      ],
      spendingColumns: [
        {
          prop: 'name',
          label: '名称'
        },
        {
          prop: 'price',
          label: '单价'
        },
        {
          prop: 'type',
          label: '规格'
        },
        {
          prop: 'num',
          label: '数量'
        }
      ],
      formInline: {
        user: '',
        region: '',
        value1: '',
        jsh: ''
      },
    })
    const closebtn = ():void => {
      // props.batchShow = false;
      console.log('zzzz', props.batchShow)
    }
    return {
      ...toRefs(datas),
      closebtn
    }
  }
  // id{}
})
</script>

<style lang="scss" spoced>
  .details-box{
    width:100%;
    height:80%;
    text-align: left;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    .rest-from{
      width: 100%;
      margin-top: 20px;
      .h-form-item{
        width: 100%;
        .h-form-item__content{
          width: 80%;
        }
      }
      .footer {
        display: flex;
        justify-content: center;
        margin-top: 10px;
        .h-form-item__content{
          width: auto;
        }
      }
    }
    .tableTitle{
      color: #D9001B;
      line-height: 30px;
    }
    .details-smallbox{
      display: flex;
      flex-direction:column;
      .details-list{
        width:100%;
        h5{
          line-height:30px;
          border-bottom: 1px solid #000;
        }
        .details-item{
          width:100% !important;
          margin: auto;
          display:flex;
          flex-direction: column;
          line-height: 30px;
          .title-top{
            display: flex;
            flex-direction: row;
            div{
              width:50%;
            }
          }
        }
      }
    }
  }

</style>

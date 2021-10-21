<template>
  <div id="quotaAdministrator">
    <div class="tableTitle">消费限制信息</div>
    <div class="tableList" v-if="DataList.length !== 0">
      <table cellspacing="0" cellpadding="0">
        <tr>
          <th>标签名称</th>
          <th>每日消费限额</th>
          <th>每月消费限额</th>
          <th>每日消费次数</th>
          <th>每月消费次数</th>
          <th :style="{ width: buttonList.length * 80 + 'px' }">
            允许购买商品种类
          </th>
          <th style="width: 70px">有效时长</th>
          <th>操作</th>
        </tr>
        <tr v-for="(item, index) in DataList" :key="index">
          <td>
            <span v-if="item.bqmc === '默认'">{{ item.bqmc }}</span>
            <div v-else class="remove">
              <h-input
                size="small"
                style="width: 120px"
                v-model.trim="item.bqmc"
                clearable
              ></h-input>
            </div>
          </td>
          <td>
            <h-input
              size="small"
              placeholder="请输入内容"
              v-model.number="item.mrxe"
              clearable
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
            >
            </h-input>
          </td>
          <td>
            <h-input
              size="small"
              placeholder="请输入内容"
              v-model.number="item.myxe"
              clearable
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
            ></h-input>
          </td>
          <td>
            <h-input
              size="small"
              placeholder="请输入内容"
              v-model.number="item.mrcs"
              clearable
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
            ></h-input>
          </td>
          <td>
            <h-input
              size="small"
              placeholder="请输入内容"
              v-model.number="item.mycs"
              clearable
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
            >
            </h-input>
          </td>
          <td>
            <h-button
              v-for="(items, indexs) in buttonList"
              :key="indexs"
              size="small"
              @click="buttonClick(index, items.id)"
              :class="{
                buttonColor:
                  item.yxgmspzl.split(';').indexOf(`${items.id}`) === -1,
                isButtonColor:
                  item.yxgmspzl.split(';').indexOf(`${items.id}`) !== -1,
              }"
            >
              {{ items.flmc }}
            </h-button>
          </td>
          <td>
            <h-input
              v-if="item.bqmc !== '默认'"
              :disabled="item.bqmc === '默认'"
              size="small"
              placeholder="请输入内容"
              v-model.number="item.yxsc"
              oninput="value=value.replace(/^\.+|[^\d.]/g,'')"
            ></h-input>
            <div v-else>长期</div>
          </td>
          <td>
            <span
              v-if="item.bqmc !== '默认'"
              class="spanColor"
              @click="personnelManagement(item.id)"
            >
              人员管理
            </span>
            <span
              v-if="item.bqmc !== '默认'"
              class="spanColor"
              @click="removeClick(index)"
              >删除</span
            >
          </td>
        </tr>
        <tr>
          <td colspan="8">
            <h-button
              @click="addClick()"
              type="primary"
              size="small"
              icon="h-icon-plus"
            >
              添加标签规则
            </h-button>
          </td>
        </tr>
      </table>
    </div>
    <div class="bcClass">
      <h-button @click="add" type="primary" size="small"> 保存 </h-button>
    </div>
  </div>
  <h-dialog-block
    wd="600px"
    ht="700px"
    v-model:showViewModel="showDialog"
    title="限制消费人员管理"
  >
    <consumption-personnel :id="id"></consumption-personnel>
  </h-dialog-block>
</template>

<script lang='ts'>
import { defineComponent, PropType, ref, reactive, toRefs } from 'vue'
import ConsumptionPersonnel from '@/views/consumeManage/limitedAdministrator/components/consumptionPersonnel.vue'
import limitedConsumption from '@/api/limitedAdministrator/limitedAdministrator'
import { IJgh, ILmited } from '@/api/model/limitedAdministratorInf'
import { HMessage, HMessageBox } from '@hz-lib/han-ui-next'
export default defineComponent({
  name: 'quotaAdministrator',
  components: { ConsumptionPersonnel },
  setup() {
    interface IButtonList {
      cjr: number
      cjsj: number
      flmc: string
      flzt: string
      id: number
      jgh: string
      xgr: number
      xgsj: null
      zt: string
    }
    interface IDatas{
      DataList:ILmited[],
      showDialog:boolean,
      DataC:ILmited,
      buttonList:IButtonList[],
      id:number
    }
    const datas = reactive<IDatas>({

      DataC: {
        bqmc: '',
        cjr: 0,
        cjsj: 1617206400000,
        jgh: '420100131',
        mrcs: 2,
        mrxe: 100,
        mycs: 3,
        myxe: 500,
        xgr: 0,
        xgsj: 1617206400000,
        yxgmspzl: '',
        yxsc: 1,
      },
      // 数据
      DataList: [],
      // 种类按钮
      buttonList: [],
      // 人员管理id,
      id: 0,
      showDialog: false
    })
    const addClick = ():void => {
      datas.DataList.push(JSON.parse(JSON.stringify(datas.DataC)))
    }
    // 删除
    const removeClick = async (index:number) => {
      HMessageBox.confirm('此操作将, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await limitedConsumption.remove(datas.DataList[index])
        if (res.code === '200') {
          HMessage.success({
            message: '删除成功!',
            type: 'success'
          })
        } else {
          HMessage.warning({
            message: '请联系管理员!',
            type: 'warning'
          })
        }
        datas.DataList.splice(index, 1)
      }).catch(() => {
        HMessage({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
    const reset = () => {
      datas.DataList.forEach((element, index) => {
        datas.DataList[index] = JSON.parse(JSON.stringify(datas.DataC))
      })
    }
    const data:any = { jgh: 420100131 }
    const queryAstrict = async () => {
      // 所有数据
      const res = await limitedConsumption.queryAstrict(data)
      // 按钮
      const resd = await limitedConsumption.classify(data)
      datas.buttonList = resd.data
      datas.DataList = res.data
    }
    queryAstrict()
    // 保存
    const add = async () => {
      console.log(datas.DataList)
      let bool = true
      datas.DataList.forEach((element:any, index) => {
        for (const key in element) {
          if (element[key] === '' && bool) {
            HMessage.warning({
              message: '不能为空哦请先输入!',
              type: 'warning'
            })
            bool = false
          }
        }
      })
      if (!bool) {
        return
      }
      const res = await limitedConsumption.add(datas.DataList)
      if (res.code === '200') {
        HMessage.success({
          message: '保存成功!',
          type: 'success'
        })
      }
    }
    // 按钮点击
    const buttonClick = (index:number, indexs:number|string):void => {
      const button:string[] = datas.DataList[index].yxgmspzl.split(';')
      if (button.indexOf(`${indexs}`) !== -1) {
        button.splice(button.indexOf(`${indexs}`), 1)
      } else {
        button.push(`${indexs}`)
      }
      console.log(button.join(';'))
      datas.DataList[index].yxgmspzl = button.join(';')
    }
    // 人员管理按钮
    const personnelManagement = (id:number) => {
      if (id) {
        datas.id = id
        datas.showDialog = true
      } else {
        HMessage.warning({
          message: '请先保存!',
          type: 'warning'
        })
      }
    }
    return {
      ...toRefs(datas),
      removeClick,
      addClick,
      reset,
      buttonClick,
      add,
      personnelManagement
    }
  }
})
</script>

<style lang="scss" scoped>
.buttonColor {
  background-color: transparent;
}
.isButtonColor {
  background-color: #388ff3 !important;
  color: #fff !important;
}
#quotaAdministrator {
  position: relative;
  height: 75vh;
  .tableTitle {
    height: 22px;
    font-family: PingFangSC-Regular;
    font-size: 16px;
    color: #333333;
    letter-spacing: 0;
    line-height: 22px;
    font-weight: 400;
    margin-bottom: 20px;
  }
  .tableList {
    overflow: auto;
    height: 65vh;
    table {
      table-layout: fixed;
      width: 100%;
      border: 1px solid #eee;
      text-align: center;
      tr {
        th,
        td {
          border-bottom: 1px solid #eee;
          border-left: 1px solid #eee;
          height: 64px;
          padding: 10px;
        }
        th {
          background: #f6f8fa !important;
          width: 128px;
          height: 34px;
          font-family: Helvetica-Bold;
          font-size: 16px;
          color: #333333;
          line-height: 34px;
          font-weight: 700;
        }
      }
    }
  }
  .bcClass {
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -40px;
  }
}
</style>

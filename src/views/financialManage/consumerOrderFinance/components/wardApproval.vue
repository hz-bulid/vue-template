<template>
<!-- 按病室审批 wardApproval-->
  <h-container class="wardApproval">
    <h-main>
      <h-tree
  :data="data"
  show-checkbox
  node-key="id"
  ref="treeRef"
   @node-click="handleNodeClick"
  :default-expanded-keys="[2, 3]"
  :default-checked-keys="[5]"
  :props="defaultProps">
</h-tree>
    </h-main>
    <h-footer class="footer">
      <h-button type="primary" @click="getCheckedKeys" size="mini">下一步</h-button>
    </h-footer>
    <h-dialog-block
      ht="32%"
      wd="28%"
      :title="orderApprovalDialog.title"
      v-model:showViewModel="orderApprovalDialog.statue"
    >
    <batchWardNo :row="orderApprovalDialog.row"
    :typeapp='typeapp'
    @close="orderApprovalDialog.statue = false"></batchWardNo>
    </h-dialog-block>
  </h-container>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, ref, watch } from 'vue'
// import { IjghAll } from '@/api/model/consumerOrderFinance'
import ConsumerOrderFinance from '@/api/consumerOrderFinance/consumerOrderFinance'
import batchWardNo from '@/views/financialManage/consumerOrderFinance/components/batchWardNo.vue'

export default defineComponent({
  components: { batchWardNo },
  props: {
    typeapp: {
      type: String,
      default: null
    }
  },
  setup(props) {
    console.log('🚀 ~ file: wardApproval.vue ~ line 40 ~ setup ~ props', props)
      type IData = {
        id: number,
        label: string,
        children?:IData[]
      }
      interface IDefaultProps{
        children: string,
        label: string
      }
      interface IjshAll{
        jgh: string
      }

      interface IDatas{
        data: IData[],
        defaultProps: IDefaultProps,
        jshAll:IjshAll,
        orderApprovalDialog:{
          statue:boolean,
          title:string,
          row:IData[],
          type:any
        },
      }
      const treeRef = ref()
      const datas = reactive<IDatas>({
        data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        jshAll: {
          jgh: '420100131'
        },
        orderApprovalDialog: {
          statue: false,
          title: '批量审批',
          row: [],
          type: ''
        },
        // treeRef.value.setCheckedNodes(state);

      })
      watch(() => props, (v:any, c:any):void => {
        console.log(v, c, 888)
        const typechild:any = v
        console.log('🚀 ~ file: wardApproval.vue ~ line 124 ~ watch ~ typechild', typechild)
      }, {
        immediate: true, // 绑定时加载
      })
      const getQyTree = async () => {
        const res = await ConsumerOrderFinance.getQyTree(datas.jshAll)
        // datas.data
        const newArr = res.data
        const newList = newArr.map((item:any) => {
          item.id = item.qybh
          item.label = item.qymc
          item.children = item.childs.map((ele:any) => {
            ele.id = ele.qybh
            ele.label = ele.qymc
            ele.children = ele.childs.map((elech:any) => {
              elech.id = elech.qybh
              elech.label = elech.qymc
              return elech
            })
            return ele
          })
          return item
        })
        datas.data = newList
        // console.log(arr)
      }
      getQyTree()
      const handleNodeClick = (data:IData):void => {
        // console.log(data)
      }
      // const handleCheckChange = (data:any, checked:any, indeterminate:any):void => { // #TODO:类型不明确

      //   // datas.defaultProps
      //   console.log('🚀 ~ file: wardApproval.vue ~ line 123 ~ handleCheckChange ~ datas.defaultProps', datas.defaultProps)
      // }
      const getCheckedKeys = () => {
        datas.orderApprovalDialog.type = props.typeapp
        datas.orderApprovalDialog.statue = true
        datas.orderApprovalDialog.row = treeRef.value.getCheckedKeys()
        console.log('🚀 ~ file: wardApproval.vue ~ line 151 ~ getCheckedKeys ~ datas.orderApprovalDialog.statue', datas.orderApprovalDialog.statue)
        console.log(treeRef.value.getCheckedKeys())
      }
      return {
        ...toRefs(datas),
        handleNodeClick,
        getCheckedKeys,
        treeRef
        // handleCheckChange
      }
  }
})
</script>

<style lang="scss" scoped>
.wardApproval{
  width: 100%;
  height:100%;
  .listBox{
    display:flex;
    flex-direction: column;
  }
  .footer {
    display: flex;
    justify-content: center;
    height: 30px !important;
  }
}
</style>

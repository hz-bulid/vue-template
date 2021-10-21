<template>
  <h-container id="commodityManagement">
    <h-aside width="16vw">
      <h-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>商品分类</span>
            <h-button class="button" @click="newClass" size="mini"
              >新增商品分类</h-button
            >
          </div>
        </template>
        <div class="card-bottom">
          <div
            class="card-list"
            :class="{ isactive: areaidclick == item.id }"
            v-for="(item, index) in leftList"
            :key="index"
            @click="leftTabClick(item)"

          >
          <!-- @contextmenu.prevent="rightTab(item, index)" -->
            <div class="h-statscard__header">{{ item.flmc }}</div>
            <!-- <div class="h-statscard__content">{{ item.value }}</div> -->
            <div class="h-statscard__content colorBlue" @click="rightTab(item, index)">操作</div>

            <!--   -->
            <div
              v-if="isShow === index"
              :class="{ isrightbox: false }"
              class="rightbox"
            >
              <div class="btncolor" @click="editleft(item)">编辑</div>
              <div class="btncolor" @click="deleteRight(item)">删除</div>
              <!-- <div></div> -->
            </div>
          </div>
        </div>
      </h-card>
    </h-aside>
    <h-container>
      <h-header height="auto">
        <h-form
          :inline="true"
          size="mini"
          :model="formInline"
          ref="numberValidateFormRef"
          class="demo-form-inline"
        >
          <h-form-item label="商品名称" prop="spmc">
            <h-input v-model="formInline.spmc" placeholder="商品名称"></h-input>
          </h-form-item>
          <h-form-item label="商品状态" prop="flzt">
            <h-select v-model="formInline.flzt" placeholder="商品状态">
              <!-- <h-option
                v-for="(item, index) in inputList"
                :key="index"
                :label="item.lable"
                :value="item.value"
              ></h-option> -->
              <h-option label="上架中" value="1"></h-option>
              <h-option label="下架中" value="2"></h-option>
            </h-select>
          </h-form-item>
          <h-form-item label="商品种类" prop="spflid">
            <h-select v-model="formInline.spflid" placeholder="商品种类">
              <h-option v-for="(item, index) in leftList"
            :key="index" :label="item.flmc" :value="item.flzt"></h-option>
              <!-- <h-option label="区域二" value="beijing"></h-option> -->
            </h-select>
          </h-form-item>
          <h-form-item>
            <h-button type="primary" size="mini" @click="onSubmit"
              >查询</h-button
            >
            <h-button type="primary" size="mini" @click="onReset('formInline')"
              >重置</h-button
            >
            <h-button type="primary" size="mini" @click="addNewProducts"
              >新增商品</h-button
            >
          </h-form-item>
        </h-form>
      </h-header>
      <h-main>
        <h-table-block
          ref="tableBlockRef"
          :method="getTable"
          :table-option="tableOption"
          :show-paging="true"
          :page-sizes="[10, 20, 50, 100]"
          :table-columns="tableColumns"
          :params="formInline"
        >
          <!-- @selection-change="selectionChange" -->
          <!-- 192.168.10.20:6088/upload/hz
 -->
          <template #demoslot="{ row }">
            <div class="tableImg">
              <!-- {{row.sptp}} -->
              <img
              v-if="row.sptp"
                alt=""
                :src="`/upload/hz/` + row.sptp"
              />
              <img
              v-else
                alt=""
                src="~@/assets/images/img.png"
              />
            </div>
          </template>
          <template #demoslotthree="{row}">
            <div>
              {{row.zt}}
            </div>
          </template>
          <template #demoslots="{ row }">
            <div class="leftBtn">
              <span @click="editNewProducts(row.index, row)">编辑</span>
              <span @click="detailsNewProducts(row.index, row)">详情</span>
              <span @click="deleteNewProducts(row.index, row)">删除</span>
            </div>
          </template>
        </h-table-block>
      </h-main>
    </h-container>
    <!-- 新增分类 -->
    <h-dialog-block
      ht="25%"
      wd="28%"
      :title="classDialog.title"
      v-model:showViewModel="classDialog.statue"
    >
      <newProductClassification
        @close="classDialog.statue = false"
        @refreshTable="refreshList"
      ></newProductClassification>
    </h-dialog-block>
    <!-- 编辑 -->
    <h-dialog-block
      ht="25%"
      wd="28%"
      :title="editclassDialog.title"
      v-model:showViewModel="editclassDialog.statue"
    >
      <editProductClassification
        @close="cosedEdit"
        @refreshTable="refreshList"
        :id="editclassDialog.id"
        :row="editclassDialog.row"
      ></editProductClassification>
    </h-dialog-block>
    <!-- 新增商品 -->
    <h-dialog-block
      ht="65%"
      wd="28%"
      :title="addDialog.title"
      v-model:showViewModel="addDialog.statue"
    >
      <addNewProducts
        @closed="addDialog.statue = false"
        @refreshTable="onSubmit"
        :type="addDialog.type"
        :row="addDialog.row"
        :id="addDialog.id"
      ></addNewProducts>
    </h-dialog-block>
  </h-container>
</template>

<script lang='ts'>
import { defineComponent, reactive, toRefs, ref } from 'vue'
import { HMessageBox, HMessage } from '@hz-lib/han-ui-next'
import { IColumn, ITableData, ITableOption } from '@/types/table'
import editProductClassification from '@/views/purchaseManage/commodityManagement/components/editProductClassification.vue'
import newProductClassification from '@/views/purchaseManage/commodityManagement/components/newProductClassification.vue'
import addNewProducts from '@/views/purchaseManage/commodityManagement/components/addNewProducts.vue'
import CommodityManagements from '@/api/consumerOrderFinance/commodityManagement'
interface Igoods{
  isPage?: boolean, // (boolean, optional): 是否支持分页 ,
  jgh: string, // (string, optional): 机构编码 ,
  pageNum?: number, // (integer, optional): 页数 ,
  pageSize?: number, // (integer, optional): 每页数量 ,
  zt: number, // (integer, optional):(string, optional):
  spmc: string,
  spflid: string,
  flzt:string,
}
// 表格
interface IList {
cjr:number,
cjsj: string,
gmsx: number,
id: number,
index: number,
jgh: string,
sjzt: string,
spflid: number,
spgg:string,
spjg: number,
spmc: string,
sptp:string,
xgr: string,
xgsj: string,
zt: string,
}
// 表单
interface IFormInline {
  spmc: string,
  zt: string,
  spflid: string,
  flzt:string,
}
interface IleftList{
  label: string,
  value: string,
  zt:string,
  id:string,
}
// 下拉框
interface INputLists{
  value:string,
  lable:string,
}
// 新增分类
interface IclassDialog{
  title: string,
  statue:boolean,
}
interface IIeditclassDialog{
  title: string,
  statue:boolean,
  type:string,
  row:any,
  id:any,
}

// 新增商品
interface IaddDialog{
  title: string,
  statue:boolean,
  type:string,
  row:any,
  id:any,
}
interface IState {
  tableOption:ITableOption,
  tableColumns:IColumn[],
  formInline: IFormInline,
  numberValidateFormRef:null | HTMLFormElement,
  inputList:INputLists[]
  leftList:IleftList[],
  classDialog:IclassDialog,
  addDialog:IaddDialog
  multipleSelection:IList[],
  goodsAll:Igoods,
  isShow:boolean | number,
  editclassDialog:IIeditclassDialog,
  areaidclick:string,
}

export default defineComponent({
  name: 'commodityManagement', // 商品管理
  components: {
    newProductClassification,
    addNewProducts,
    editProductClassification
  },
  setup() {
    const getTable = async (data:any) => {
      state.goodsAll.spmc = state.formInline.spmc
      state.goodsAll.spflid = state.formInline.spflid
      state.goodsAll.flzt = state.formInline.flzt
      state.goodsAll.pageNum = data.pageNum
      state.goodsAll.pageSize = data.pageSize
      const res = await CommodityManagements.querySpxxList(state.goodsAll)
      return res.data
    }
    const state = reactive<IState>({
      tableOption: {
        showRadio: true,
        showIndex: true // 一个函数
      },
      tableColumns: [// type="selection" width="55"
        { title: '商品图片', width: '100px', hidden: true, slot: 'demoslot' }, // sptp
        { prop: 'spmc', title: '商品名称' },
        { prop: 'spjg', title: '价格' },
        { prop: 'spgg', title: '规格' },
        { prop: 'spflid', title: '商品种类' },
        { title: '商品状态', width: '100px', hidden: true, slot: 'demoslotthree' },
        // { prop: 'zt', title: '商品状态' },
        { title: '操作', width: '120px', hidden: true, slot: 'demoslots' },
      ],
      formInline: {
        spmc: '',
        zt: '',
        spflid: '',
        flzt: ''
      },
      numberValidateFormRef: null,
      inputList: [
        // {
        //   value: '1',
        //   lable: '已审核'
        // },
        // {
        //   value: '3',
        //   lable: '待审核'
        // },
        // {
        //   value: '2',
        //   lable: '审核'
        // }
      ],
      multipleSelection: [],
      leftList: [],
      classDialog: {
        title: '新增分类',
        statue: false,
      },
      addDialog: {
        title: '',
        statue: false,
        type: '',
        id: '',
        row: []
      },
      goodsAll: {
        isPage: true,
        jgh: '420100131',
        pageNum: 1,
        pageSize: 10,
        zt: 1,
        spmc: '',
        spflid: '',
        flzt: '',
      },
      isShow: false,
      editclassDialog: {
        title: '编辑',
        statue: false,
        type: '',
        id: '',
        row: []
      },
      areaidclick: '',
    })
    const tableBlockRef = ref()
    // 左侧下方联动
    const leftTabClick = (item:IleftList) => {
      state.areaidclick = item.id
      state.goodsAll.spflid = item.id
      onSubmit()
      // console.log('IleftList', item)
    }
    // 查询
    const onSubmit = () => {
      // 刷新列表
      if (tableBlockRef.value) {
        tableBlockRef.value.refresh()
      }
    }
    const refreshList = () => {
      querySpf()
    }
    // 重置
    const onReset = (formName: string): void => {
      console.log(formName)
      if (state.numberValidateFormRef) {
        state.numberValidateFormRef.resetFields()
      }
      console.log('onReset')
    }
    // 新增商品分类
    const newClass = () => {
      state.classDialog.statue = true
    }
    // 新增商品
    const addNewProducts = () => {
      state.addDialog.statue = true
      state.addDialog.title = '新增商品'
      state.addDialog.type = 'add'
      state.addDialog.id = null
    }
    // 编辑
    const editNewProducts = (index:number, row:IList) => {
      state.addDialog.statue = true
      state.addDialog.title = '编辑商品'
      state.addDialog.type = 'edit'
      state.addDialog.row = row
      state.addDialog.id = row.id
    }
    // 详情
    const detailsNewProducts = (index:number, row:IList) => {
      state.addDialog.statue = true
      state.addDialog.title = '商品详情'
      state.addDialog.type = 'details'
      state.addDialog.row = row
    }
    // 删除
    const deleteNewProducts = (index:number, row:IList) => {
      onSubmit()
      HMessageBox.confirm('是否确认删除此商品，请确认选择无误！?', '提示', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const ids:any = row.id
        const res = await CommodityManagements.updateSpxx({
          id: ids,
          zt: 2
        })
        if (res.code === '200') {
          onSubmit()
          HMessage({
            type: 'success',
            message: '删除成功!'
          })
        } else {
          HMessage({
            type: 'info',
            message: '删除失败'
          })
        }
      }).catch(() => {

      })
    }
    // 商品分类左侧
    const querySpf = async () => {
      const res = await CommodityManagements.querySpflList({
        jgh: state.goodsAll.jgh,
        zt: '1'
      })
      state.leftList = res.data
    }
    querySpf()
    // 左边编辑,子组件隐藏
    const cosedEdit = () => {
      state.isShow = false
      state.editclassDialog.statue = false
    }
    // 右击
    const rightTab = (val:any, index:number) => {
      console.log(state.isShow)
      if (state.isShow !== index) {
        state.isShow = index
      } else {
        state.isShow = false
      }
    }
    const editleft = async (item:any) => {
      state.isShow = false
      state.editclassDialog.statue = true
      state.editclassDialog.id = item.id
      state.editclassDialog.row = item
    }
    const deleteRight = async (item:any) => {
      state.isShow = false
      HMessageBox.confirm('是否确认删除此商品，请确认选择无误！?', '提示', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const ids:any = item.id
        const res = await CommodityManagements.updateSpfl({
          id: ids,
          zt: '2'
        })
        if (res.code === '200') {
          refreshList()
          state.isShow = false
          HMessage({
            type: 'success',
            message: '删除成功!'
          })
        } else {
          HMessage({
            type: 'info',
            message: '删除失败'
          })
        }
      }).catch(() => {

      })
    }
    return {
      ...toRefs(state),
      getTable,
      leftTabClick, // 左边按钮
      onReset, // 重置
      onSubmit, // 查询
      newClass, // 新增商品分类
      addNewProducts, // 新增商品
      editNewProducts, // 编辑
      detailsNewProducts, // 详情
      deleteNewProducts, // 删除
      tableBlockRef,
      refreshList,
      rightTab,
      editleft,
      deleteRight,
      cosedEdit
    }
  }
})
</script>

<style lang="scss" scoped>
#commodityManagement {
  width: 100%;
  height: 100%;
  .tableImg {
    // height:100px;
    img {
      width: 60px !important;
      height: 60px;
    }
  }
  .leftBtn {
    display: flex;
    // flex-direction: column;
    span {
      padding-right: 10px;
      color: #60a5f5;
      cursor: pointer;
    }
  }
  .card-bottom {
    position: relative;
    height: 70vh;
  }
  .colorBlue{
    color: #388ff3 !important;
  }
  .rightbox {
    width: 88px;
    padding: 10px 0;
    // height:70px;
    border-radius: 4px;
    border: 1px solid #eee;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    background: #fff;
    text-align: center;
    line-height: 20px;
    position: absolute;
    right: -10px;
    top: 40px;
    z-index: 1000;
    .btncolor {
      width: 100%;
      line-height: 36px;
      color: #666;
      // border:1px solid #eee;
      cursor: pointer;
      &:hover {
        color: #388ff3;
        background-color: #ebf4fe;
      }
    }
  }
  .isrightbox {
    display: none;
  }
  .box-card {
    height: 100%;
    width: 100%;
    // display:flex;
    .h-card {
      width: 100% !important;
      height: 100% !important;
      .h-card__header {
        padding: 0 !important;
      }
      .card-header {
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
      }
    }
    .card-bottom {
      .card-list {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: space-between;
        border-radius: 4px;
        border: 1px solid #eee;
        background-color: #fff;
        box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
        padding: 10px 30px;
        font-size: 14px;
        margin-bottom: 20px;
        cursor: pointer;
        .h-statscard__header {
          color: #666;
          position: relative;
        }
        .h-statscard__content {
          color: #333;
        }
      }
      .isactive {
        border: 1px solid #388ff3;
        box-shadow: inset 4px 0 0 0 #388ff3;
      }
    }
  }
}
</style>

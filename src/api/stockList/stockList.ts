import http from '@/plugins/http'
import {
  IStockListDate,
  IStockOrderListData,
  IProgressData,
  IDeliverGoodsTableData,
  IStockUpData,
  IChangeDeliverGoods
} from '@/api/stockList/model/stockList'

class StockList extends http {
  /**
   * 查询所有应用信息
   */
  getStockListData(data:IStockListDate) {
    // 获取备货左侧统计
    // export const list  = data => request('/ckfw/consume/list', data,"POST")
    return this.get<IStockListDate>('/HZ-SPP-WIN-APPLICATION/ckfw/choice/bhCount', data)
  }

  getStockOrderListData(data:IStockOrderListData) {
    // 获取备货清单列表
    // export const list  = data => request('/ckfw/consume/list', data,"POST")
    return this.post<IStockOrderListData>('/HZ-SPP-WIN-APPLICATION/ckfw/choice/bhqdList', data)
  }

  getTableOptionData(data:IStockListDate) {
    // 获取所有大队名称数据
    // export const list  = data => request('/ckfw/consume/list', data,"POST")
    return this.get<IStockListDate>('/HZ-SPP-WIN-APPLICATION/ckfw/choice/getQy', data)
  }

  getDeliverGoodsTableData(data:IDeliverGoodsTableData) {
    // 获取点击大队表格数据  同时获取 详情按钮弹窗中  查看配货清单
    // export const list  = data => request('/ckfw/consume/list', data,"POST")
    return this.get<IDeliverGoodsTableData>('/HZ-SPP-WIN-APPLICATION/ckfw/choice/getPhqd', data)
  }

  getStockUpData(data:IStockUpData) {
    // 获取详情按钮弹窗中  查看备货清单
    // export const list  = data => request('/ckfw/consume/list', data,"POST")
    return this.post<IStockUpData>('/HZ-SPP-WIN-APPLICATION/ckfw/choice/getBhqd', data)
  }

  getInpatientWardTableData(data:IDeliverGoodsTableData) {
    // 获取  点击详情  查看确认清单
    // export const list  = data => request('/ckfw/consume/list', data,"POST")
    return this.get<IDeliverGoodsTableData>('/HZ-SPP-WIN-APPLICATION/ckfw/choice/getQrqd', data)
  }

  getProgressData(data:IProgressData) {
    // 获取详情按钮弹窗中进度数据
    // export const list  = data => request('/ckfw/consume/list', data,"POST")
    return this.get<IProgressData>('/HZ-SPP-WIN-APPLICATION/ckfw/choice/getDljdByBh', data)
  }

  getChangeDeliverGoods(data:IChangeDeliverGoods) {
    // 获取详情按钮弹窗中进度数据
    // export const list  = data => request('/ckfw/consume/list', data,"POST")
    return this.post<IChangeDeliverGoods>('/HZ-SPP-WIN-APPLICATION/ckfw/choice/bhdcz', data)
  }

  getAbnormalOrderData(data:IDeliverGoodsTableData) {
    // 获取  点击详情  查看确认清单
    // export const list  = data => request('/ckfw/consume/list', data,"POST")
    return this.get<IDeliverGoodsTableData>('/HZ-SPP-WIN-APPLICATION/ckfw/choice/getYcdd', data)
  }
}

export default new StockList()

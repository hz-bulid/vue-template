import http from '@/plugins/http'
import { ITableListData, ITableIncomeData, ITableExpenditureData } from '@/api/generalLedger/model/generalLedger'
class GeneralLedger extends http {
  /**
   * 查询所有应用信息
   */
  getLeftListData() {
    // 获取备货左侧统计
    // export const list  = data => request('/ckfw/consume/list', data,"POST")
    return this.get<null>('/HZ-SPP-WIN-APPLICATION/cw-account/organ/statistic-amt', null)
  }

  getTableListData(data:ITableListData) {
    // 获取表单列表信息
    // export const list  = data => request('/ckfw/consume/list', data,"POST")
    return this.post<ITableListData>('/HZ-SPP-WIN-APPLICATION/cw-account/organ/query', data)
  }

  getTableIncomeData(data:ITableIncomeData) {
    // 获取  详情中 收入 表单   列表信息
    // export const list  = data => request('/ckfw/consume/list', data,"POST")
    return this.post<ITableIncomeData>('/HZ-SPP-WIN-APPLICATION/cw-account/organ/transfer-detail-query', data)
  }

  getTableExpenditureData(data:ITableExpenditureData) {
    // 获取  详情中 支出 表单   列表信息
    // export const list  = data => request('/ckfw/consume/list', data,"POST")
    return this.post<ITableExpenditureData>('/HZ-SPP-WIN-APPLICATION/cw-account/organ/settle-detail-query', data)
  }
}

export default new GeneralLedger()

import http from '@/plugins/http'
import { Ifinance, Iedit, IjghAll, Ichild, IjshAll, Ishouhuo } from '@/api/model/consumerOrderFinance'

class ConsumerOrderFinance extends http {
  /**
   * 查询所有应用信息
   */
  initAll(data: Ifinance) {
    // 获取消费订单列表
    return this.post<Ifinance>('/HZ-SPP-WIN-APPLICATION/ckfw/consume/list', data)
  }

  // 导出
  downloadDdxx(data: Ifinance) {
    return this.post<Ifinance>('/HZ-SPP-WIN-APPLICATION/ckfw/consume/downloadDdxx', data, 'arraybuffer')
  }

  // 获取消费订单统计
  orderList() {
    return this.post<null>('/HZ-SPP-WIN-APPLICATION/ckfw/consume/count', null)
  }

  // 消费订单批量修改
  orderEditList(data: Iedit) {
    return this.post<Iedit>('/HZ-SPP-WIN-APPLICATION/ckfw/consume/plxg', data)
  }

  // 订单确认收货/发货
  orderqrsh(data: Ishouhuo) {
    return this.post<Ishouhuo>('/HZ-SPP-WIN-APPLICATION/ckfw/consume/qrsh', data)
  }
  // export const qrsh  = data => request('/ckfw/consume/qrsh', data,"GET")

  // 消费订单批量修改
  orderxspadd(data: Iedit) {
    return this.post<Iedit>('/HZ-SPP-WIN-APPLICATION/ckfw/consume/spdd', data)
  }
  // /ckfw/consume/spdd

  // 获取消费订单详情
  // export const detail  = data => request('/', data,"GET")
  orderDetailList(data: Iedit) {
    return this.get<Iedit>('/HZ-SPP-WIN-APPLICATION/ckfw/consume/detail', data)
  }

  // //根据id获取订单购物详情
  shopDetailList(data: Ichild) {
    return this.get<Ichild>('/HZ-SPP-WIN-APPLICATION/ckfw/consume/shopDetail', data)
  }

  // 获取角色类型
  getJsLx() {
    return this.get<null>('/HZ-SPP-WIN-APPLICATION/ckfw/consume/getJsLx', null)
  }

  // 获取qybh下的区域 如果传空或者不传则获取机构下所有
  getQy(data: IjghAll) {
    return this.get<IjghAll>('/HZ-SPP-WIN-APPLICATION/ckfw/choice/getQy', data)
  }

  // 获取戒毒所下区域树
  getQyTree(data: IjshAll) {
    return this.get<IjshAll>('/HZ-SPP-WIN-APPLICATION/ckfw/choice/getQyTree', data)
  }

  dcYlxtSnjyTz() {
    return this.get<null>('/HZ-SPP-HOSPITAL-APPLICATION/ylxt/tz/download/ylxt_snjy_tz', null)
  }

  getupload() {
    return this.post<null>('/HZ-FILE/file/upload', null)
  }
}

export default new ConsumerOrderFinance()

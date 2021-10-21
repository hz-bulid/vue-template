import http from '@/plugins/http'
import { Igoods, Iaddgoods, Iaddgooslist, IgoodsLeft } from '@/api/model/consumerOrderFinance'

class CommodityManagements extends http {
  /**
   * 查询所有应用信息
   */
  // 查询商品分类
  querySpflList(data:IgoodsLeft) {
    return this.post<IgoodsLeft>('/HZ-SPP-WIN-APPLICATION/ckfw/cw/spfl/querySpfl', data)
  }

  // 添加商品分类
  addSpflList(data:Iaddgoods) {
    return this.post<Iaddgoods>('/HZ-SPP-WIN-APPLICATION/ckfw/cw/spfl/addSpfl', data)
  }

  // 更新商品分类
  // export const updateSpfl  = data => request('/ckfw/cw/spfl/updateSpfl', data,"POST")
  // 更新商品分类
  // export const updateSpfl  = data => request('/ckfw/cw/spfl/updateSpfl', data,"POST")
  updateSpfl(data:IgoodsLeft) {
    return this.post<IgoodsLeft>('/HZ-SPP-WIN-APPLICATION/ckfw/cw/spfl/updateSpfl', data)
  }

  // 查询商品信息
  querySpxxList(data:Igoods) {
    // 获取消费订单列表
    return this.post<Igoods>('/HZ-SPP-WIN-APPLICATION/ckfw/cw/spxx/querySpxx', data)
  }

  // 添加商品信息
  addSpxxList(data:Iaddgooslist) {
    // 获取消费订单列表
    return this.post<Iaddgooslist>('/HZ-SPP-WIN-APPLICATION/ckfw/cw/spxx/addSpxx', data)
  }

  // 更新商品信息
  updateSpxx(data:Iaddgooslist) {
    // 获取消费订单列表
    return this.post<Iaddgooslist>('/HZ-SPP-WIN-APPLICATION/ckfw/cw/spxx/updateSpxx', data)
  }
// export const updateSpxx  = data => request('/ckfw/cw/spxx/updateSpxx', data,"POST")
}

export default new CommodityManagements()

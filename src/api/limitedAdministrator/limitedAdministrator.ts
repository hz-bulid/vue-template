import http from '@/plugins/http'
import { IJgh, ILmited, ITables, IData, IDate, IAddXfxzry, IBjx, ICancelLimited } from '@/api/model/limitedAdministratorInf'

class limitedConsumption extends http {
  /**
   * 添加限制消费
   */
  // limitedConsumption(data: Ifinance) {
  //
  //   return this.post<Ifinance>('/HZ-SPP-WIN-APPLICATION/ckfw/consume/list', data)
  // }

  /**
 * 查询时间
 */
  timeDatecx(data: IData) {
    return this.post<IData>('/HZ-SPP-WIN-APPLICATION/ckfw/cw/xfxz/queryXfrq', data)
  }

  /**
 * 修改时间
 */
  timeDate(data: IDate[]) {
    return this.post<IDate[]>('/HZ-SPP-WIN-APPLICATION/ckfw/cw/xfxz/updateXfrq', data)
  }

  /**
 * 限制人员添加
 */
  addXfxzry(data: IAddXfxzry) {
    return this.post<IAddXfxzry>('/HZ-SPP-WIN-APPLICATION/ckfw/cw/xfxz/addXfxzry', data)
  }

  /**
   * 百家姓搜索
   */
  bjx(data: IBjx) {
    return this.post<IBjx>('/HZ-SPP-WIN-APPLICATION/ckfw/cw/xfxz/queryXfxzryBjx', data)
  }

  /**
   * 取消限制人员
   */
  cancelLimited(data: ICancelLimited) {
    return this.post<ICancelLimited>('/HZ-SPP-WIN-APPLICATION/ckfw/cw/xfxz/deleteXfxzry', data)
  }

  /**
   * 限制人员列表 跟 查询人员列表
   */
  limitedList(data: ITables) {
    return this.post<ITables>('/HZ-SPP-WIN-APPLICATION/ckfw/cw/xfxz/queryXfxzry', data)
  }

  /**
   * 删除
   */
  remove(data: ILmited) {
    return this.post<ILmited>('/HZ-SPP-WIN-APPLICATION/ckfw/cw/xfxz/deleteXfxz', data)
  }

  /**
   * 商品分类
   */
  classify(data: IJgh) {
    return this.post<IJgh>('/HZ-SPP-WIN-APPLICATION/ckfw/cw/spfl/querySpfl', data)
  }

  /**
   * 添加
   */
  add(data: ILmited[]) {
    return this.post<ILmited[]>('/HZ-SPP-WIN-APPLICATION/ckfw/cw/xfxz/updateXfxz', data)
  }

  /**
   * 查询消费限制
   */
  queryAstrict(data: IJgh) {
    return this.post<IJgh>('/HZ-SPP-WIN-APPLICATION/ckfw/cw/xfxz/queryXfxz', data)
  }
}

export default new limitedConsumption()

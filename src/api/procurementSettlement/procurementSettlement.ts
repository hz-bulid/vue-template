import http from '@/plugins/http'
interface IJgh {
  jgh: number | string
}
interface IJs {
  bhdBh: string, // : 备货单编号 ,
  cjr?: string, // : 创建人Id(前端不用传) ,
  jsId?: string, // : 结算id(前端不用传) ,
  jsfs: string, // : 结算方式 ,
  jsje: string, // : 结算金额 ,
  jsrq: string, // : 结算日期 ,
  skf: string, // : 收款方 ,
  zfBh: string, // : 转账/支票编号
}
class procurementSettlement extends http {
  /**
   * 查询table的信息
   */
  query(data: any) {
    return this.post<any>('/HZ-SPP-WIN-APPLICATION/ckfw/choice/bhqdList', data)
  }

  /**
   * 左侧数据
   */
  leftList(data: IJgh) {
    return this.get<IJgh>('/HZ-SPP-WIN-APPLICATION/ckfw/choice/jsdCount', data)
  }

  /**
   * 备货单结算
   */
  clearingForm(data: any) {
    return this.post<any>('/HZ-SPP-WIN-APPLICATION/ckfw/choice/bhdjs', data)
  }
}

export default new procurementSettlement()

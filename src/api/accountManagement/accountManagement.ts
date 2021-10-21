import http from '@/plugins/http'

class accountManagement extends http {
  /**
   * 清退注销确定按钮
   */
  logout(data: any) {
    return this.get<any>('/HZ-SPP-WIN-APPLICATION/cw-account/prison/cancellation', data)
  }

  /**
   * 查看明细
   */
  queryCondition(data: any) {
    return this.post<any>('/HZ-SPP-WIN-APPLICATION/cw-account/prison/detail-query', data)
  }

  /**
   * 查看明细左侧联动右侧
   */
  queryConditionLeft(data: any) {
    return this.post<any>('/HZ-SPP-WIN-APPLICATION/cw-account/prison/detail-query', data)
  }

  // 获取消费订单详情
  // export const detail  = data => request('/', data,"GET")
  orderDetailList(data: any) {
    return this.get<any>('/HZ-SPP-WIN-APPLICATION/ckfw/consume/detail', data)
  }

  /**
   * 清退注销按钮
   */
  returnLogoutGet(data: any) {
    return this.get<any>('/HZ-SPP-WIN-APPLICATION/ckfw/consume/getZtNum', data)
  }

  /**
   * 查看明细/cw-account/prison/transfer-detail-query
   */
  particulars(data: any) {
    return this.get<any>('/HZ-SPP-WIN-APPLICATION/cw-account/prison/transfer-detail-query', data)
  }

  /**
   * 左边left的信息
   */
  LeftQuery() {
    return this.get<null>('/HZ-SPP-WIN-APPLICATION/cw-account/organ/statistic-acct', null)
  }

  /**
   * 查询总账信息
   */
  query(data: any) {
    return this.post<any>('/HZ-SPP-WIN-APPLICATION/cw-account/prison/query', data)
  }

  /**
   * 修改密码
   */
  ChangeThePassword(data: any) {
    return this.get<any>('/HZ-SPP-WIN-APPLICATION/cw-account/prison/reset-password', data)
  }

  /**
   * 确定收货
   */
  materialDate(data: any) {
    return this.post<any>('/HZ-SPP-WIN-APPLICATION/ckfw/consume/qrsh', data)
  }

  /**
   * 取消订单
   */
  cancellationOfOrder(data: any) {
    return this.post<any>('/HZ-SPP-WIN-APPLICATION/ckfw/consume/qxdd', data)
  }
}

export default new accountManagement()

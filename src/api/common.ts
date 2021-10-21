/*
 * @Author: your name
 * @Date: 2021-04-01 17:30:36
 * @LastEditTime: 2021-04-01 18:25:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hz-finances\src\api\common.js
 */
import http from '@/plugins/http'

class Common extends http {
  /**
   * 查询所有应用信息
   */
  initMenu() {
    return this.get<null>('/HZ-USER-SERVER/menu_api/search/all_application', null)
  }
}

export default new Common()

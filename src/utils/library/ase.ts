/*
 * @Description:AES加密
 * @Autor: ZY
 * @Date: 2020-11-04 13:33:44
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-03-27 11:39:49
 */
import { AES, mode, pad, enc } from 'crypto-ts'
import { Keys } from '@/enums/key'

export default class VAES {
  static encrypt(text: string | null): string | null {
    return AES.encrypt(text ?? '', Keys.aseKey, { mode: mode.ECB, padding: pad.PKCS7 }).toString()
  }

  static decrypt(text: string | null): string | null {
    return AES.decrypt(text ?? '', Keys.aseKey, { mode: mode.ECB, padding: pad.PKCS7 }).toString(enc.Utf8)
  }
}

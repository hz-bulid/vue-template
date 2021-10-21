/*
 * @Description:全局存储类封装（AES加解密）
 * @Autor: wsx
 * @Date: 2020-11-04 11:51:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-04-03 12:35:57
 */

// import VAES from "./ase";

export enum StorageType {
  local,
  session
}

interface IVStorageInterface {
  setItem<T>(key: string, value: T, type: StorageType): void
  getItem(key: string, type: StorageType): string | null
  removeItem(key: string, type: StorageType): void
}

function isJSON(str: string) {
  if (typeof str === 'string') {
    try {
      return JSON.parse(str)
    } catch (e) {
      return str
    }
  }
  return str
}
class VStorage implements IVStorageInterface {
  private static instance: VStorage
  static shared() {
    if (!this.instance) {
      this.instance = new VStorage()
    }
    return this.instance
  }

  /**
   * @description: 本地保存数据AES加密处理
   * @param {StorageType} type localStorage 和 sessionStorage 选择
   * @param {string} key
   * @param {T} value
   * @return {*}
   */
  setItem<T>(key: string, value: T, type: StorageType = StorageType.local) {
    const valueJson = JSON.stringify(value)
    // const valueAes = VAES.encrypt(valueJson) as string;
    if (type === StorageType.local) {
      localStorage.setItem(key, valueJson)
    } else if (type === StorageType.session) {
      sessionStorage.setItem(key, valueJson)
    }
  }

  getItem(key: string, type: StorageType = StorageType.local): any {
    if (type === StorageType.local) {
      // return VAES.decrypt(localStorage.getItem(key));
      let value = localStorage.getItem(key)
      if (value) {
        value = isJSON(value)
      }
      return value
    } else if (type === StorageType.session) {
      // return VAES.decrypt(sessionStorage.getItem(key));
      let value = sessionStorage.getItem(key)
      if (value) {
        value = isJSON(value)
      }
      return value
    }
  }

  removeItem(key: string, type: StorageType = StorageType.local) {
    if (type === StorageType.local) {
      localStorage.removeItem(key)
    } else if (type === StorageType.session) {
      sessionStorage.removeItem(key)
    }
  }
}

export default VStorage.shared()

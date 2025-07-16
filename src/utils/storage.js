import { get, set, del, createStore } from 'idb-keyval'

// 创建自定义的 IndexedDB 存储对象
const dbName = "WechatTool"
const storeName = "PiniaDB"
const customDB = createStore(dbName, storeName)

export const indexedDBStorage = {
  async getItem(key) {
    return (await get(key, customDB)) || null
  },
  async setItem(key, value) {
    await set(key, value, customDB)
  },
  async removeItem(key) {
    await del(key, customDB)
  }
}
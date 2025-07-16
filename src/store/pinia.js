import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";
import { indexedDBStorage } from "@/utils/storage";

// 创建pinia实例
const pinia = createPinia();
// pinia持久化
pinia.use(createPersistedState({
  storage: indexedDBStorage,
}));

export default pinia;

import { createPinia } from "pinia";
import piniaPluginPersist from "pinia-plugin-persist";

// 创建pinia实例
const pinia = createPinia();
// pinia持久化
pinia.use(piniaPluginPersist);

export default pinia;

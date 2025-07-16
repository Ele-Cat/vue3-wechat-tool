import { createApp } from "vue";
import pinia from "@/store/pinia";
import App from "./App.vue";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/reset.css";
import "./global.less";

import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
const app = createApp(App);

app.use(pinia);
import useStore from "@/store";
const { useChatStore, useSystemStore, useTemplateStore, useUserStore } = useStore();
useChatStore.init()
useSystemStore.init()
useTemplateStore.init()
useUserStore.init()

app.use(Antd);
app.use(PerfectScrollbar, {
  watchOptions: true,
  options: {
    minScrollbarLength: 38, // 设定最小滚动条高度
    // maxScrollbarLength: 200, // 设定最大滚动条高度
  }
});
app.mount("#app");

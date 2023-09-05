<template>
  <div class="wt-sider">
    <div class="menu-box">
      <div v-for="menu in menus" :key="menu.value" class="menu-item"
        :class="{ active: useSystemStore.activeMenu === menu.value }" @click="handleMenuClick(menu)">
        <i :class="['wefont', 'weicon-' + menu.value]"></i>
        <p>{{ menu.label }}</p>
      </div>
    </div>
    <div class="wt-form">
      <component :is="configComponents[useSystemStore.activeMenu]" />
    </div>
  </div>
</template>

<script setup>
import { reactive } from "vue";
import ConfigAppearance from "./ConfigAppearance.vue";
import ConfigChat from "./ConfigChat.vue";
import ConfigInstructions from "./ConfigInstructions.vue";
import useStore from "@/store";
const { useSystemStore } = useStore();

const menus = reactive([
  {
    label: "外观设置",
    value: "appearance",
  }, {
    label: "对话设置",
    value: "chat",
  }, {
    label: "使用说明",
    value: "instructions",
  }
])

const handleMenuClick = (menu) => {
  useSystemStore.activeMenu = menu.value
}

const configComponents = reactive({
  appearance: ConfigAppearance,
  chat: ConfigChat,
  instructions: ConfigInstructions,
});
</script>

<style lang="less" scoped>
.wt-sider {
  display: flex;
  height: 100%;

  .menu-box {
    width: 80px;
    height: 100%;
    background-color: #F1F1F1;

    .menu-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 80px;
      cursor: pointer;
      transition: all .3s;

      i {
        font-size: 24px;
        margin-bottom: 6px;
      }

      &.active,
      &:hover {
        background-color: #F9F9F9;
      }
    }
  }
}</style>
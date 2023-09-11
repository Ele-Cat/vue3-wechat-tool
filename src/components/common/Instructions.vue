<template>
  <div class="config-instructions">
    <p class="text-red">欢迎使用本程序，本程序仅供娱乐切勿用于非法途径，由此产生任何纠纷由使用者本人自己承担！具体条款请查看：<span class="disclaimers" @click="showDrawer">免责声明</span></p>
    <p>本系统完全<span class="text-red">免费开源</span>，更新地址：<a href="https://gitee.com/ele-cat/vue3-wechat-tool" target="_blank">点击查看源码</a></p>
    <p>欢迎加入：<a :href="useSystemStore.qqGroupLink" target="_blank">QQ群聊</a></p>
  </div>
  <Disclaimers :open="open" @close="onClose" />
</template>

<script setup>
import { ref } from 'vue';
import Disclaimers from './Disclaimers.vue';
import useStore from "@/store";
const { useSystemStore } = useStore();

const open = ref(false);
const showDrawer = () => {
  open.value = true;
};
const onClose = () => {
  open.value = false;
};
</script>

<style lang="less" scoped>
.config-instructions {
  p {
    font-size: 16px;
    line-height: 1.4;
  }
  .text-red {
    color: #FD6585;
  }
  .disclaimers {
    text-decoration: underline;
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
}</style>
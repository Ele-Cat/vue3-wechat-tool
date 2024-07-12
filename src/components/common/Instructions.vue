<template>
  <div class="config-instructions">
    <p>欢迎使用本程序，本程序仅供娱乐切勿用于非法途径，由此产生任何纠纷由使用者本人自己承担！具体条款请查看：<span class="disclaimers" @click="showDrawer">免责声明</span></p>
    <p>本系统完全<span class="text-orange">免费开源</span>，更新地址：<a href="https://github.com/ele-cat/vue3-wechat-tool" target="_blank">点击查看源码</a></p>
    <p>欢迎：
      <a-popover :overlay-inner-style="{ padding: 0 }" placement="right">
        <template #content>
          <a-qrcode :value="useSystemStore.qqGroupLink" :bordered="false" :color="token.colorPrimary" />
          <p style="text-align:center;margin-top:-10px;">或手机qq扫码加群</p>
        </template>
        <a :href="useSystemStore.qqGroupLink" target="_blank">点击加入QQ群聊</a>
      </a-popover>
    </p>
    <p>👉<a href='https://www.bilibili.com/video/BV1Q84y1S7iA/?share_source=copy_web&vd_source=a365c12124cceb4ffcbdc878f6f2ef60' target="_blank">使用教程【B站】</a></p>
    <p>👉<a href='https://ele-cat.github.io/tools/Vue3WechatTool.html#使用教程' target="_blank">使用教程【文本】</a></p>
    <p>👉<a href='https://ele-cat.github.io/tools/Vue3WechatTool.html#开发教程' target="_blank">开发教程</a></p>
  </div>
  <Disclaimers :open="open" @close="onClose" />
</template>

<script setup>
import { ref } from 'vue';
import { theme } from 'ant-design-vue';
const { useToken } = theme;
const { token } = useToken();
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
  a {
    text-decoration: underline;
  }
  .text-orange {
    color: #fb923c;
  }
  .disclaimers {
    text-decoration: underline;
    color: #FD6585;
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
}</style>
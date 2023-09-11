<template>
  <div class="is-phone">
    <p>请使用PC端浏览器打开</p>
    <a-button type="primary" @click="copy()">一键复制网址</a-button>
  </div>
</template>

<script setup>
import { toast } from "@/utils/feedback";
import { copyText } from '@/utils/utils';

const copy = () => {
  copyText('https://ele-cat.gitee.io/vue3-wechat-tool/')
  toast({
    type: "success",
    content: "复制成功！",
  });
}
</script>

<style lang="less" scoped>
.is-phone {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 28px;
}
</style>
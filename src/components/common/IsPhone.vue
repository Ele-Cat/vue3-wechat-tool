<template>
  <div class="is-phone">
    <p>请使用PC端浏览器打开</p>
    <a-button type="primary" @click="copy(link)">一键复制网址</a-button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { toast } from "@/utils/feedback";
import { useClipboard } from '@vueuse/core';

const link = ref('https://ele-cat.gitee.io/vue3-wechat-tool/');
const { text, copy, copied, isSupported } = useClipboard(link);

watch(copied, (newVal) => {
  if (newVal) {
    toast({
      type: "success",
      content: "复制成功！",
    });
    copied.value = false;
  }
})
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
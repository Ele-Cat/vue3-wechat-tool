<template>
  <div class="wt-ctrl">
    <div class="wtc-button" @click="handleGeneratePng">生成图片</div>
    <div class="wtc-button" @click="handleGenerateGif">生成动图</div>
    <div class="wtc-button" @click="handleGenerateVideo">生成视频</div>
  </div>
</template>

<script setup>
import { toast } from "@/utils/feedback";

const handleGeneratePng = () => {
  toast({
    type: "warning",
    content: "生成图片功能开发中！",
  });
}
const handleGenerateGif = () => {
  toast({
    type: "warning",
    content: "生成动图功能开发中！",
  });
}
const handleGenerateVideo = () => {
  toast({
    type: "warning",
    content: "生成视频功能开发中！",
  });
}
</script>

<style lang="less" scoped>
.wt-ctrl {
  position: absolute;
  top: 50%;
  right: -74px;
  transform: translate(0, -50%);

  .wtc-button {
    line-height: 28px;
    text-align: center;
    padding: 0 8px;
    font-size: 12px;
    background-image: linear-gradient(135deg, #fd6e6a 10%, #ffc600 100%);
    border-radius: 6px;
    color: #ffffff;
    cursor: pointer;
    transition: all 0.5s ease;
    &+.wtc-button {
      margin-top: 10px;
    }
    &:hover {
      transition: all 0.5s ease;
      box-shadow: 0 0 20px inset #fd6e6a;
      background-image: linear-gradient(135deg, #ffc600 10%, #fd6e6a 100%);
    }
  }
}
</style>

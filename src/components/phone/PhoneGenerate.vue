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
  right: -66px;
  width: 60px;
  transform: translate(0, -50%);

  .wtc-button {
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 12px;
    background-image: linear-gradient(135deg, #ffe985 10%, #fa742b 100%);
    background-image: linear-gradient(135deg, #ffa8a8 10%, #fcff00 100%);
    background-image: linear-gradient(135deg, #3b2667 10%, #bc78ec 100%);
    background-image: linear-gradient(135deg, #f6d242 10%, #ff52e5 100%);
    background-image: linear-gradient(135deg, #fd6e6a 10%, #ffc600 100%);
    border-radius: 50%;
    margin-bottom: 12px;
    color: #ffffff;
    cursor: pointer;
    transition: all 0.1s;
    &:hover {
      box-shadow: 0 0 20px inset #ffc600;
    }
  }
}
</style>

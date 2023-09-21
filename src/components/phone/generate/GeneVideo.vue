<template>
  <a-tooltip title="生成视频前可以修改配置" placement="right">
    <div class="wtc-button" @click="handleGenerateVideo">生成视频</div>
  </a-tooltip>
  <canvas ref="canvas" width="640" height="480"></canvas>
  <video :src="videoSource" controls></video>
</template>

<script setup>
import { toast } from "@/utils/feedback";
import { ref } from "vue";

const canvas = ref(null);
const videoSource = ref(null);
// 生成视频
const handleGenerateVideo = () => {
  toast({
    type: "warning",
    content: "生成视频功能开发中！",
  });

  const stream = canvas.value.captureStream(); // 捕获Canvas的媒体流
  const mediaRecorder = new MediaRecorder(stream); // 创建MediaRecorder对象

  const chunks = [];

  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      chunks.push(event.data);
    }
  };

  mediaRecorder.onstop = () => {
    const blob = new Blob(chunks, { type: 'video/webm' }); // 创建Blob对象
    videoSource.value = URL.createObjectURL(blob); // 设置video标签的src属性
  };

  mediaRecorder.start(); // 开始录制

  // 在Canvas上绘制内容，这里以绘制红色矩形为例
  const ctx = canvas.value.getContext('2d');
  ctx.fillStyle = 'red';
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);

  setTimeout(() => {
    mediaRecorder.stop(); // 结束录制
  }, 5000); // 5秒后结束录制
}
</script>

<style>

</style>
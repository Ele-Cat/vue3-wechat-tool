<template>
  <div class="wt-ctrl">
    <a-tooltip title="滚动到哪截到哪" placement="right">
      <div class="wtc-button" @click="handleGeneratePng">生成图片</div>
    </a-tooltip>
    <a-tooltip title="顾名思义" placement="right">
      <div class="wtc-button" @click="handleGenerateLongPng">生成长图</div>
    </a-tooltip>
    <!-- <div class="wtc-button" @click="handleGenerateGif">生成动图</div>
    <div class="wtc-button" @click="handleGenerateVideo">生成视频</div> -->
  </div>

  <a-drawer :width="500" :title="drawerTitle" placement="right" :open="drawerVisible" @close="onClose">
    <template #extra>
      <a-button type="primary" @click="handleDownload">下载</a-button>
    </template>
    <img :src="imageUrl" v-if="imageUrl" alt="">
    <!-- <img :src="gifUrl" v-if="gifUrl" alt=""> -->
  </a-drawer>
</template>

<script setup>
import { ref } from "vue";
import dayjs from "dayjs";
import { toast } from "@/utils/feedback";
import useStore from "@/store";
const { useChatStore, useSystemStore } = useStore();
import { useHtmlToImage, useHtmlToGif } from '@/hooks/useHtmlToImage';

const { imageUrl, captureHtmlToImage } = useHtmlToImage();
const drawerVisible = ref(false)
const drawerTitle = ref('')
const handleGeneratePng = () => {
  const phoneWrap = document.querySelector('.phone-wrap');
  captureHtmlToImage(phoneWrap);
  drawerVisible.value = true;
  drawerTitle.value = "生成图片";
}
const handleGenerateLongPng = async () => {
  const wechatContent = document.querySelector('.wechat-content')
  const phoneWrap = document.querySelector('.phone-wrap')
  const phone = document.querySelector('#phone')
  const phoneBody = document.querySelector('.phone-body')
  const phoneRealHeight = wechatContent.scrollHeight + 264 + 269
  phone.style.height = phoneRealHeight + "px"
  phoneBody.scrollTop = 0

  captureHtmlToImage(phoneWrap, {
    height: phoneRealHeight * 0.32,
  });
  drawerVisible.value = true;
  drawerTitle.value = "生成长图";

  phone.style.height = useSystemStore.phoneHeight + "px";
}

const { gifUrl, captureHtmlToGif } = useHtmlToGif();
const handleGenerateGif = () => {
  captureHtmlToGif(props.phone);
  useChatStore.chatList.push({
    id: "chat-" + Date.now(),
    type: "text",
    content: "你是谁",
    role: "own",
  })
  drawerVisible.value = true;
  drawerTitle.value = "生成动图";
}
const handleGenerateVideo = () => {
  toast({
    type: "warning",
    content: "生成视频功能开发中！",
  });
}

const onClose = () => {
  drawerVisible.value = false;
}

const handleDownload = () => {
  const link = document.createElement('a');
  link.href = imageUrl.value;
  link.download = `微信聊天图片 - ${dayjs().format('YYYYMMDDHHmmss')}.png`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>

<style lang="less" scoped>
.wt-ctrl {
  position: absolute;
  top: 0;
  right: -10px;
  transform: translate(100%, 0);

  .wtc-button {
    height: 32px;
    line-height: 30px;
    text-align: center;
    padding: 0 12px;
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

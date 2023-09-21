<template>
  <a-tooltip title="滚动到哪截到哪" placement="right">
    <div class="wtc-button" @click="handleGeneratePng">生成图片</div>
  </a-tooltip>
  <a-tooltip title="顾名思义" placement="right">
    <div class="wtc-button" @click="handleGenerateLongPng">生成长图</div>
  </a-tooltip>

  <a-drawer :width="500" :title="drawerTitle" placement="right" :closable="false" :maskClosable="false" :destroyOnClose="true" :open="drawerVisible" @close="onClose">
    <template #extra>
      <a-space>
        <a-button type="primary" :disabled="imgLoading" @click="handleDownload">下载</a-button>
        <a-button danger type="primary" :disabled="imgLoading" @click="onClose">关闭</a-button>
      </a-space>
    </template>
    <img :src="imageUrl" alt="">
  </a-drawer>
</template>

<script setup>
import { ref } from 'vue';
import { useHtmlToImage } from '@/hooks/useHtmlToImage';
import useStore from "@/store";
const { imageUrl, captureHtmlToImage } = useHtmlToImage();
const { useSystemStore } = useStore();

const drawerVisible = ref(false);
const drawerTitle = ref('');

// 生成图片
const handleGeneratePng = () => {
  const phoneWrap = document.querySelector('.phone-wrap');
  captureHtmlToImage(phoneWrap);
  drawerVisible.value = true;
  drawerTitle.value = "生成图片";
}

// 生成长图
const handleGenerateLongPng = () => {
  const wechatContent = document.querySelector('.wechat-content')
  const phoneWrap = document.querySelector('.phone-wrap')
  const phoneBg = document.querySelector('.phone-bg')
  const chatBackground = useSystemStore.appearance.chatBackground
  const phone = document.querySelector('#phone')
  const phoneBody = document.querySelector('.phone-body')
  const phoneRealHeight = useSystemStore.phoneHeight > wechatContent.scrollHeight + 264 + 269 ? useSystemStore.phoneHeight : wechatContent.scrollHeight + 264 + 269;
  phone.style.height = phoneRealHeight + "px"
  phoneBody.scrollTop = 0
  if (chatBackground) {
    phoneBg.querySelector('img').setAttribute('src', '')
  }

  captureHtmlToImage(phoneWrap, {
    height: phoneRealHeight * 0.32,
  });

  phone.style.height = useSystemStore.phoneHeight + "px";
  if (chatBackground) {
    phoneBg.querySelector('img').setAttribute('src', chatBackground)
  }
  drawerVisible.value = true;
  drawerTitle.value = "生成长图";
}

const onClose = () => {
  drawerVisible.value = false;
  imageUrl.value = "";
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
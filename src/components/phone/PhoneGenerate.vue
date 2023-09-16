<template>
  <div class="wt-ctrl">
    <a-tooltip title="将当前对话保存为模板" placement="right">
      <div class="wtc-button" @click="handleSaveTemplate">存为模板</div>
    </a-tooltip>
    <a-tooltip title="滚动到哪截到哪" placement="right">
      <div class="wtc-button" @click="handleGeneratePng">生成图片</div>
    </a-tooltip>
    <a-tooltip title="顾名思义" placement="right">
      <div class="wtc-button" @click="handleGenerateLongPng">生成长图</div>
    </a-tooltip>
    <!-- <a-tooltip title="生成动图前有一系列的配置" placement="right">
      <div class="wtc-button" @click="handleGenerateGif">生成动图</div>
    </a-tooltip> -->
    <!-- <div class="wtc-button" @click="handleGenerateVideo">生成视频</div> -->
  </div>

  <a-modal v-model:open="addTemplateModalVisible" centered title="保存模板" :width="400" @cancel="handleTemplateCancel" @ok="handleTemplateOk">
    <a-form :model="formState" :label-col="{ style: { width: '80px' }}">
      <a-form-item label="模板标题" style="margin-top:40px;">
        <a-input v-model:value="formState.templateTitle" placeholder="请输入模板标题" />
      </a-form-item>
    </a-form>
  </a-modal>

  <a-drawer :width="500" :title="drawerTitle" placement="right" :open="drawerVisible" @close="onClose">
    <template #extra>
      <a-button type="primary" @click="handleDownload">下载</a-button>
    </template>
    <img :src="imageUrl" v-if="imageUrl" alt="">
    <img :src="gifUrl" v-if="gifUrl" alt="">
  </a-drawer>
</template>

<script setup>
import { onUnmounted, reactive, ref } from "vue";
import dayjs from "dayjs";
import { toast } from "@/utils/feedback";
import useStore from "@/store";
const { useChatStore, useSystemStore, useTemplateStore } = useStore();
import { useHtmlToImage, useHtmlToGif } from '@/hooks/useHtmlToImage';
import html2canvas from 'html2canvas';
import GIF from 'gif.js';

// 将当前对话保存为模板
const formState = reactive({
  templateTitle: "",
})
const addTemplateModalVisible = ref(false);
const handleSaveTemplate = () => {
  formState.templateTitle = `聊天模板${dayjs().format("YYYY-MM-DD HH:mm:ss")}`
  addTemplateModalVisible.value = true;
}
// 保存模板
const handleTemplateOk = async () => {
  if (!formState.templateTitle.trim()) {
    toast({
      type: "warning",
      content: "请输入模板标题",
    });
    return;
  }
  const phoneWrap = document.querySelector('.phone-wrap');
  await captureHtmlToImage(phoneWrap);
  useTemplateStore.add({
    title: formState.templateTitle,
    chatList: useChatStore.chatList,
    snapshot: imageUrl.value,
  });
  addTemplateModalVisible.value = false;
  toast({
    type: "success",
    content: "模板保存成功，请在模板管理栏目查看",
  });
}
// 取消保存
const handleTemplateCancel = () => {
  addTemplateModalVisible.value = false;
}

const { imageUrl, captureHtmlToImage } = useHtmlToImage();
const drawerVisible = ref(false)
const drawerTitle = ref('')

// 生成图片
const handleGeneratePng = () => {
  const phoneWrap = document.querySelector('.phone-wrap');
  captureHtmlToImage(phoneWrap);
  drawerVisible.value = true;
  drawerTitle.value = "生成图片";
}

// 生成长图
const handleGenerateLongPng = async () => {
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
  drawerVisible.value = true;
  drawerTitle.value = "生成长图";

  phone.style.height = useSystemStore.phoneHeight + "px";
  if (chatBackground) {
    phoneBg.querySelector('img').setAttribute('src', chatBackground)
  }
}

// const { gifUrl, captureHtmlToGif } = useHtmlToGif();
// 生成动图
let gifTimer = null;
onUnmounted(() => {
  gifTimer && clearInterval(gifTimer);
})
const gifUrl = ref("")
const handleGenerateGif = async () => {
  const element = document.querySelector('.phone-wrap');
  // drawerVisible.value = true;
  // drawerTitle.value = "生成动图";

  let canvas = await html2canvas(element)
  const gif = new GIF({
    quality: 100,
  }); // 创建GIF对象
  let counter = 1;
  gifTimer = setInterval(async() => {
    counter++;
    if (counter >= 5) {
      clearInterval(gifTimer)
      gif.render();
    }
    useChatStore.chatList.push({
      id: "chat-" + Date.now(),
      type: "text",
      content: "你是谁" + Date.now(),
      role: "own",
    })
    canvas = await html2canvas(element)
    gif.addFrame(canvas, { delay: 1000, copy: true }); // 添加帧到GIF，可以设置延迟时间
  }, 1000)

  // 下载GIF到本地
  gif.on('finished', function(blob) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.gif';
    a.click();
    clearInterval(gifTimer);
  });

  // 或者显示在页面上
  // gif.on('finished', function(blob) {
  //   console.log(123);
  //   const url = URL.createObjectURL(blob);
  //   gifUrl.value = url;
  // });

  // 定时停止录制
  // setTimeout(() => {
  //   gif.render();
  // }, duration);

  // captureHtmlToGif(props.phone);
  // useChatStore.chatList.push({
  //   id: "chat-" + Date.now(),
  //   type: "text",
  //   content: "你是谁",
  //   role: "own",
  // })
  // drawerVisible.value = true;
  // drawerTitle.value = "生成动图";
}

// 生成视频
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

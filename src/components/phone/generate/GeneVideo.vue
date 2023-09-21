<template>
  <a-tooltip title="生成视频前可以修改配置" placement="right">
    <div class="wtc-button" @click="handleGenerateVideo">生成视频</div>
  </a-tooltip>

  <a-drawer :width="500" title="生成视频" placement="right" :closable="false" :destroyOnClose="true" :open="drawerVisible" @close="onClose">
    <template #extra>
      <a-space>
        <a-button type="primary" :disabled="!videoSource" @click="handleDownload">下载</a-button>
        <a-button danger type="link" shape="circle" :icon="h(CloseOutlined)" :disabled="!videoSource" @click="onClose" />
      </a-space>
    </template>
    
    <canvas ref="canvas" :width="canvasWidth" :height="canvasHeight" v-show="true"></canvas>
    <video :src="videoSource" controls v-if="videoSource"></video>
    <div class="default-loading" v-else>
      <a-spin tip="生成中..." size="large"></a-spin>
    </div>
  </a-drawer>
</template>

<script setup>
import { ref, h } from "vue";
import { CloseOutlined } from '@ant-design/icons-vue';
import _ from "lodash";
import html2canvas from 'html2canvas';
import eventBus from '@/utils/eventBus';
import { sleep } from "@/utils/utils";
import useStore from "@/store";
const { useChatStore, useSystemStore } = useStore();

const canvasWidth = useSystemStore.phoneWidth * useSystemStore.phoneScale
const canvasHeight = useSystemStore.phoneHeight * useSystemStore.phoneScale

const initInterval = 1000;
const drawerVisible = ref(false);
const canvas = ref(null);
const videoSource = ref(null);
// 生成视频
const handleGenerateVideo = async () => {
  drawerVisible.value = true;
  let chatList = _.cloneDeep(useChatStore.chatList);
  document.getElementById('imgBox').innerHTML = '';
  let promiseArr = [];
  
  useChatStore.chatList = [];
  promiseArr.push(generateImg(`chat-0`));
  for(let i = 0; i < chatList.length; i++) {
    await sleep(200);
    useChatStore.chatList.push(chatList[i]);
    eventBus.emit("sentChat");
    const maxInterval = useChatStore.generateConfig.maxInterval
    const minInterval = useChatStore.generateConfig.minInterval
    promiseArr.push(generateImg(chatList[i]['id'], chatList[i]['intervalTime'] || Math.floor(Math.random() * (maxInterval - minInterval + 1)) + minInterval));
  }

  Promise.all(promiseArr).then(res => {
    console.log('res: ', res);
    if(res) {
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

      // for (let i = 0; i < res.length; i++) {
      //   gif.addFrame(res[i], { delay: res[i]['id'].split('-')[2] });

      //   const image = new Image(); // 创建一个新的图像对象
      //   image.src = res[i]; // 设置图像的源文件路径
      //   // ctx.fillStyle = getRandomColor();
      //   ctx.drawImage(image, 0, 0);
      //   ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);
      // }

      let timer = setInterval(() => {
        const image = new Image(); // 创建一个新的图像对象
        image.src = 'https://next.antdv.com/assets/logo.1ef800a8.svg'; // 设置图像的源文件路径
        ctx.fillStyle = getRandomColor();
        ctx.drawImage(image, 0, 0);
        ctx.fillRect(0, 0, canvas.value.width, canvas.value.height);
      }, 1000)

      const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;   
      }

      setTimeout(() => {
        mediaRecorder.stop(); // 结束录制
        clearInterval(timer);
      }, 5000); // 5秒后结束录制
    }
  })
}
const generateImg = (chatId, time) => {
  return new Promise(async(resolve, reject) => {
    let intervalTime = time || initInterval;
    let node = document.querySelector('.phone-wrap');
    setTimeout(() => {
      html2canvas(node)
      .then((dataUrl) => {
        // let img = new Image();
        // img.src = dataUrl.toDataURL();
        // img.id = `${chatId}-${intervalTime}`;
        // img.className = 'imgPiece';
        // document.getElementById('imgBox').appendChild(img);
        // resolve(document.getElementById(`${chatId}-${intervalTime}`));
        resolve(dataUrl);
      })
      .catch(function (error) {
        reject(error);
      });
    }, 0)
  })
}

const onClose = () => {
  drawerVisible.value = false;
  videoSource.value = "";
}

const handleDownload = () => {
  const link = document.createElement('a');
  link.href = videoSource.value;
  link.download = `微信聊天视频 - ${dayjs().format('YYYYMMDDHHmmss')}.gif`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>

<style>

</style>
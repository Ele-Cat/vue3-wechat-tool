<template>
  <a-tooltip title="生成动图前可以修改配置" placement="right">
    <div class="wtc-button" @click="handleGenerateGif">生成动图<div id="imgBox" v-show="false"></div></div>
  </a-tooltip>

  <a-drawer :width="500" title="生成动图" placement="right" :closable="false" :maskClosable="false" :destroyOnClose="true" :open="drawerVisible" @close="onClose">
    <template #extra>
      <a-space>
        <a-button type="primary" :disabled="imgLoading" @click="handleDownload">下载</a-button>
        <a-button danger type="primary" :disabled="imgLoading" @click="onClose">关闭</a-button>
      </a-space>
    </template>
    <img :src="gifUrl" v-if="gifUrl" alt="">
    <div class="default-loading" v-else>
      <a-spin tip="生成中..." size="large"></a-spin>
    </div>
  </a-drawer>
</template>

<script setup>
import { ref } from "vue";
import _ from "lodash";
import html2canvas from 'html2canvas';
import GIF from 'gif.js';
import eventBus from '@/utils/eventBus';
import { sleep } from "@/utils/utils";
import useStore from "@/store";
const { useChatStore, useSystemStore } = useStore();

// 第一条延迟多久展示
const initInterval = 1000;
const drawerVisible = ref(false);
const gifUrl = ref("")
// 生成动图
const handleGenerateGif = async() => {
  drawerVisible.value = true;
  let chatList = _.cloneDeep(useChatStore.chatList);
  document.getElementById('imgBox').innerHTML = '';
  let promiseArr = [];
  
  useChatStore.chatList = [];
  promiseArr.push(generateImg(`chat-0`));
  for(let i = 0; i < chatList.length; i++) {
    await sleep(500);
    useChatStore.chatList.push(chatList[i]);
    eventBus.emit("sentChat");
    const maxInterval = useChatStore.generateConfig.maxInterval
    const minInterval = useChatStore.generateConfig.minInterval
    promiseArr.push(generateImg(chatList[i]['id'], chatList[i]['intervalTime'] || Math.floor(Math.random() * (maxInterval - minInterval + 1)) + minInterval));
  }

  Promise.all(promiseArr).then(res => {
    if(res) {
      const gif = new GIF({
        quality: 10,
        width: useSystemStore.phoneWidth * useSystemStore.phoneScale,
        height: useSystemStore.phoneHeight * useSystemStore.phoneScale,
      });
      for (let i = 0; i < res.length; i++) {
        gif.addFrame(res[i], { delay: res[i]['id'].split('-')[2] });
      }
      gif.on('finished', (blob) => {
        const url = URL.createObjectURL(blob);
        gifUrl.value = url;
      });
      
      gif.render();
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
        let img = new Image();
        img.src = dataUrl.toDataURL();
        img.id = `${chatId}-${intervalTime}`;
        img.className = 'imgPiece';
        document.getElementById('imgBox').appendChild(img);
        resolve(document.getElementById(`${chatId}-${intervalTime}`));
      })
      .catch(function (error) {
        reject(error);
      });
    }, 0)
  })
}

const onClose = () => {
  drawerVisible.value = false;
  gifUrl.value = "";
}

const handleDownload = () => {
  const link = document.createElement('a');
  link.href = gifUrl.value;
  link.download = `微信聊天图片 - ${dayjs().format('YYYYMMDDHHmmss')}.gif`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>
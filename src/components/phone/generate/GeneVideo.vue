<template>
  <a-tooltip title="生成视频前可以修改配置" placement="right">
    <div class="wtc-button" @click="handleGenerateVideo">生成视频</div>
  </a-tooltip>

  <a-drawer :width="500" title="生成视频" placement="right" :closable="false" :destroyOnClose="true" :open="drawerVisible" @close="onClose">
    <template #extra>
      <a-space>
        <a-button type="primary" :disabled="!videoUrl" @click="handleDownload">下载Zip</a-button>
        <a-button danger type="link" shape="circle" :icon="h(CloseOutlined)" :disabled="!generated" @click="onClose" />
      </a-space>
    </template>
    <p>1、通过网页生成的视频会有模糊、重影的问题无法规避，所以就在考量在线生成视频的必要性，最终决定生成出带有编号的图片序列，用户下载压缩包后自行通过视频剪辑软件剪辑。</p>
    <p>2、当然你也可以右键保存单张图片！</p>
    <div id="videoBox" v-show="videoUrl"></div>
    <div class="default-loading" v-if="!videoUrl">
      <a-spin tip="生成中..." size="large"></a-spin>
    </div>
  </a-drawer>
</template>

<script setup>
import { ref, h, nextTick } from "vue";
import { CloseOutlined } from '@ant-design/icons-vue';
import _ from "lodash";
import JSZip from 'jszip';
import dayjs from "dayjs";
import html2canvas from 'html2canvas';
import eventBus from '@/utils/eventBus';
import { sleep } from "@/utils/utils";
import useStore from "@/store";
const { useChatStore } = useStore();

// 第一条延迟多久展示
const initInterval = 1000;
const drawerVisible = ref(false);
const videoUrl = ref("");
const zip = new JSZip();
// 生成视频
const handleGenerateVideo = async () => {
  drawerVisible.value = true;
  let chatList = _.cloneDeep(useChatStore.chatList);
  nextTick(() => {
    document.getElementById('videoBox').innerHTML = '';
  })
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
    if(res) {
      zip.generateAsync({ type: 'blob' })
      .then(blob => {
        videoUrl.value = URL.createObjectURL(blob);
      });
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
        nextTick(() => {
          document.getElementById('videoBox').appendChild(img);
        })
        dataUrl.toBlob((blob) => {
          // 处理 Blob 对象
          zip.file(`${chatId}-${intervalTime}.png`, blob);
          resolve(document.getElementById(`${chatId}-${intervalTime}`));
        }, 'image/png');
      })
      .catch(function (error) {
        reject(error);
      });
    }, 0)
  })
}

const onClose = () => {
  drawerVisible.value = false;
  videoUrl.value = "";
}

const handleDownload = () => {
  const link = document.createElement('a');
  link.href = videoUrl.value;
  link.download = `微信聊天视频 - ${dayjs().format('YYYYMMDDHHmmss')}.zip`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>

<style>

</style>
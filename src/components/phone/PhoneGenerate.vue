<template>
  <div class="wt-ctrl">
    <a-tooltip title="将当前对话保存为模板" placement="right">
      <div class="wtc-button" @click="handleSaveTemplate">存为模板</div>
    </a-tooltip>

    <a-divider style="border-color: var(--theme-color)" />

    <a-tooltip title="滚动到哪截到哪" placement="right">
      <div class="wtc-button" @click="handleGeneratePng">生成图片</div>
    </a-tooltip>
    <a-tooltip title="顾名思义" placement="right">
      <div class="wtc-button" @click="handleGenerateLongPng">生成长图</div>
    </a-tooltip>

    <a-divider style="border-color: var(--theme-color)" />

    <a-tooltip title="生成动图、视频配置" placement="right">
      <div class="wtc-button" @click="handleGifVideoConfig">配置</div>
    </a-tooltip>
    <a-tooltip title="生成动图前可以修改配置" placement="right">
      <div class="wtc-button" @click="handleGenerateGif">生成动图</div>
    </a-tooltip>
    <div id="imgBox" v-show="false"></div>
    <!-- <div class="wtc-button" @click="handleGenerateVideo">生成视频</div> -->
  </div>

  <a-modal v-model:open="addTemplateModalVisible" centered title="保存模板" :width="400" @cancel="handleTemplateCancel" @ok="handleTemplateOk">
    <a-form :model="templateState" :label-col="{ style: { width: '80px' }}">
      <a-form-item label="模板标题" style="margin-top:40px;">
        <a-input v-model:value="templateState.templateTitle" placeholder="请输入模板标题" />
      </a-form-item>
    </a-form>
  </a-modal>

  <a-modal v-model:open="gvConfigModalVisible" centered title="动图、视频生成配置" :width="600" @cancel="handleGvConfigCancel" @ok="handleGvConfigOk">
    <a-form :model="configState" :label-col="{ style: { width: '80px' }}">
      <a-form-item label="会话间隔" style="margin-top:40px;">
        <a-space>
          <a-tooltip title="最小间隔">
            <a-input-number v-model:value="useChatStore.generateConfig.minInterval" :min="0" :max="10000" placeholder="最小间隔" :precision="0" addon-after="ms" style="width:160px;" />
          </a-tooltip>
          <p>~</p>
          <a-tooltip title="最大间隔">
            <a-input-number v-model:value="useChatStore.generateConfig.maxInterval" :min="0" :max="10000" placeholder="最大间隔" :precision="0" addon-after="ms" style="width:160px;" />
          </a-tooltip>
        </a-space>
        <p class="form-tip">会话间隔可以理解为<b>回复考虑时长</b>，考虑时长为<b>最小间隔</b>~<b>最大间隔</b>的随机数</p>
      </a-form-item>
      <a-form-item label="发送音效" style="margin-top:30px;">
        <a-switch v-model:checked="useChatStore.generateConfig.chatSound" disabled />
        <p class="form-tip">生成视频时，每次会话发送时是否有音效</p>
      </a-form-item>
    </a-form>
  </a-modal>

  <a-drawer :width="500" :title="drawerTitle" placement="right" :closable="false" :maskClosable="false" :destroyOnClose="true" :open="drawerVisible" @close="onClose">
    <template #extra>
      <a-space>
        <a-button type="primary" :disabled="imgLoading" @click="handleDownload">下载</a-button>
        <a-button danger type="primary" :disabled="imgLoading" @click="onClose">关闭</a-button>
      </a-space>
    </template>
    <img :src="imageUrl" v-if="drawerType === 'png'" alt="">
    <img :src="gifUrl" v-if="drawerType === 'gif'" alt="">
    <div class="default-loading" v-if="imgLoading">
      <a-spin tip="生成中..." size="large"></a-spin>
    </div>
  </a-drawer>
</template>

<script setup>
import { computed, reactive, ref, watch } from "vue";
import dayjs from "dayjs";
import { toast } from "@/utils/feedback";
import useStore from "@/store";
const { useChatStore, useSystemStore, useTemplateStore } = useStore();
import { useHtmlToImage, useHtmlToGif } from '@/hooks/useHtmlToImage';
import html2canvas from 'html2canvas';
import GIF from 'gif.js';
import eventBus from '@/utils/eventBus';
import _ from "lodash";

// 将当前对话保存为模板
const templateState = reactive({
  templateTitle: "",
})
const addTemplateModalVisible = ref(false);
const handleSaveTemplate = () => {
  templateState.templateTitle = `聊天模板${dayjs().format("YYYY-MM-DD HH:mm:ss")}`
  addTemplateModalVisible.value = true;
}
// 保存模板
const handleTemplateOk = async () => {
  if (!templateState.templateTitle.trim()) {
    toast({
      type: "warning",
      content: "请输入模板标题",
    });
    return;
  }
  const phoneWrap = document.querySelector('.phone-wrap');
  await captureHtmlToImage(phoneWrap);
  useTemplateStore.add({
    title: templateState.templateTitle,
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
const drawerType = ref('')
// 生成图片
const handleGeneratePng = () => {
  const phoneWrap = document.querySelector('.phone-wrap');
  captureHtmlToImage(phoneWrap);
  drawerType.value = "png";
  drawerVisible.value = true;
  drawerTitle.value = "生成图片";
}

// 生成长图
const handleGenerateLongPng = async () => {
  drawerType.value = "png";
  drawerVisible.value = true;
  drawerTitle.value = "生成长图";
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
}

const configState = reactive({

})
const gvConfigModalVisible = ref(false);
const handleGifVideoConfig = () => {
  gvConfigModalVisible.value = true;
}
watch(() => useChatStore.generateConfig.minInterval, (newVal, oldVal) => {
  if (newVal > useChatStore.generateConfig.maxInterval) {
    toast({
      type: "warning",
      content: "最小间隔需小于等于最大间隔！"
    })
    useChatStore.generateConfig.minInterval = oldVal
  }
})
watch(() => useChatStore.generateConfig.maxInterval, (newVal, oldVal) => {
  if (newVal < useChatStore.generateConfig.minInterval) {
    toast({
      type: "warning",
      content: "最大间隔需大于等于最小间隔！"
    })
    useChatStore.generateConfig.maxInterval = oldVal
  }
})
const handleGvConfigCancel = () => {
  gvConfigModalVisible.value = false;
}
const handleGvConfigOk = () => {
  gvConfigModalVisible.value = false;
}

// 第一条延迟多久展示
const initInterval = 1000;
const gifUrl = ref("")
// 生成动图
const handleGenerateGif = async() => {
  drawerType.value = "gif";
  drawerVisible.value = true;
  drawerTitle.value = "生成动图";
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

const sleep = async(time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  });
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
  drawerType.value = "";
  imageUrl.value = "";
  gifUrl.value = "";
}

const imgLoading = computed(() => {
  return (drawerType.value === 'png' && !imageUrl.value) || (drawerType.value === 'gif' && !gifUrl.value)
})

const handleDownload = () => {
  const link = document.createElement('a');
  link.href = drawerType.value === "png" ? imageUrl.value : gifUrl.value;
  link.download = `微信聊天图片 - ${dayjs().format('YYYYMMDDHHmmss')}.${drawerType.value}`;
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

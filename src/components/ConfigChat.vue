<template>
  <perfect-scrollbar>
    <a-form :model="formState" layout="vertical">
      <a-form-item>
        <slot name="label">
          <div class="config-label">
            <span>选择发送用户：</span>
            <a-button type="link">用户管理</a-button>
          </div>
        </slot>
        <div class="user-select-box">
          <div class="user-item"></div>
        </div>
      </a-form-item>
      <a-form-item label="">
        <a-tabs v-model:activeKey="activeType" size="small" tab-position="top" :style="{ width: '360px' }">
          <a-tab-pane v-for="addType in addTypes" :key="addType.value" :tab="addType.label"></a-tab-pane>
        </a-tabs>
        <a-card size="small" :bordered="true" :title="addTypeName">
          <a-form :model="formState">
            <template v-if="activeType === 'text'">
              <a-textarea v-model:value="formState.phoneBattery" :autoSize="{minRows: 3, maxRows: 6}" />
              <div class="emojis">
                <img :src="getAssetsFile(`/emoji/emoji_${i}.png`)" v-for="i in 2" :key="i" alt="">
              </div>
            </template>
          </a-form>
          <template #actions>
            <a-button block danger type="link" size="small">清空</a-button>
            <a-button block type="link" size="small">发送</a-button>
          </template>
        </a-card>
        <!-- <p>文本、图片、转账、红包、语音、系统消息、拍一拍、撤回消息、时间</p>
        <p>输入、表情</p>
        <p>拖动上传base64</p>
        <p>转账金额、备注</p>
        <p>红包金额、备注</p>
        <p>语音时间、是否已读</p>
        <p>系统消息</p> -->
      </a-form-item>
      <!-- <a-form-item label="聊天背景">
        <a-upload v-model:file-list="fileList" name="avatar" list-type="picture-card" class="avatar-uploader"
          :show-upload-list="false" action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :before-upload="beforeUpload" @change="handleChange">
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
          <div v-else>
            <loading-outlined v-if="loading"></loading-outlined>
            <plus-outlined v-else></plus-outlined>
            <div class="ant-upload-text">+</div>
          </div>
        </a-upload>
      </a-form-item> -->
    </a-form>
  </perfect-scrollbar>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { models, networkTypes, wifiSignals, phoneSignals } from "@/utils/enum"
import dayjs from 'dayjs';
import { getAssetsFile } from "@/utils/utils"

const formState = reactive({
  model: "apple",
  darkMode: false,
  networkType: "wifi",
  wifiSignal: "3",
  phoneSignal: "4",
  phoneTime: dayjs('12:21', 'HH:mm'),
  isCharging: true,
  phoneBattery: 60,
  earphoneMode: true,
  unreadMessages: 1,
  chatTitle: "小甜甜",
  voiceMode: false,
});

const activeType = ref('text')
const addTypeName = computed(() => {
  return addTypes.find(item => item.value === activeType.value)['label']
})
const addTypes = reactive([
  {
    label: "文本",
    value: "text",
  }, {
    label: "图片",
    value: "image",
  }, {
    label: "转账",
    value: "transferAccounts",
  }, {
    label: "红包",
    value: "redEnvelope",
  }, {
    label: "语音",
    value: "voice",
  }, {
    label: "系统消息",
    value: "systemMessages",
  }, {
    label: "拍一拍",
    value: "takeAPat",
  }, {
    label: "时间",
    value: "time",
  }, {
    label: "撤回消息",
    value: "recallMessage",
  }
])

import { message } from 'ant-design-vue';
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
const fileList = ref([]);
const loading = ref(false);
const imageUrl = ref('');
const handleChange = info => {
  if (info.file.status === 'uploading') {
    loading.value = true;
    return;
  }
  if (info.file.status === 'done') {
    // Get this url from response in real world.
    getBase64(info.file.originFileObj, base64Url => {
      imageUrl.value = base64Url;
      loading.value = false;
    });
  }
  if (info.file.status === 'error') {
    loading.value = false;
    message.error('upload error');
  }
};
const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
</script>

<style lang="less" scoped>
.config-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.emojis {
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-around;
  max-height: 126px;
  overflow-y: auto;
  img {
    width: 22px;
    margin: 4px 5px;
  }
}

.avatar-uploader>.ant-upload {
  width: 128px;
  height: 128px;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: -12px;
  font-size: 46px;
  color: #666;
}
</style>

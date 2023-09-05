<template>
  <perfect-scrollbar>
    <a-form :model="formState" :label-col="labelCol">
      <a-form-item label="机型">
        <a-select :options="models" v-model:value="formState.model"></a-select>
      </a-form-item>
      <a-form-item label="网络类型">
        <a-select :options="networkTypes" v-model:value="formState.networkType"></a-select>
      </a-form-item>
      <a-form-item label="wifi信号" v-if="formState.networkType === 'wifi'">
        <a-select :options="wifiSignals" v-model:value="formState.wifiSignal"></a-select>
      </a-form-item>
      <a-form-item label="手机信号" v-else>
        <a-select :options="phoneSignals" v-model:value="formState.phoneSignal"></a-select>
      </a-form-item>
      <a-form-item label="系统时间">
        <a-time-picker v-model:value="formState.phoneTime" format="HH:mm" :allowClear="false" />
      </a-form-item>
      <a-form-item label="是否充电">
        <a-switch v-model:checked="formState.isCharging" />
      </a-form-item>
      <a-form-item label="手机电量">
        <a-input v-model:value="formState.phoneBattery" />
      </a-form-item>
      <a-form-item label="听筒模式">
        <a-switch v-model:checked="formState.earphoneMode" />
      </a-form-item>
      <a-form-item label="未读消息数">
        <a-input v-model:value="formState.unreadMessages" />
      </a-form-item>
      <a-form-item label="聊天标题">
        <a-input v-model:value="formState.chatTitle" />
      </a-form-item>
      <a-form-item label="语音模式">
        <a-switch v-model:checked="formState.voiceMode" />
      </a-form-item>
      <a-form-item label="聊天背景">
        <a-upload
          v-model:file-list="fileList"
          name="avatar"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
          <div v-else>
            <loading-outlined v-if="loading"></loading-outlined>
            <plus-outlined v-else></plus-outlined>
            <div class="ant-upload-text">+</div>
          </div>
        </a-upload>
      </a-form-item>
    </a-form>
  </perfect-scrollbar>
</template>

<script setup>
import { reactive } from "vue";
import { models, networkTypes, wifiSignals, phoneSignals } from "@/utils/enum"
import dayjs from 'dayjs';

const formState = reactive({
  model: "apple",
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
const labelCol = {
  style: {
    width: "80px",
  },
};

import { ref } from 'vue';
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
.avatar-uploader > .ant-upload {
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

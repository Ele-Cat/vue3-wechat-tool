<template>
  <perfect-scrollbar>
    <a-form :model="formState" :label-col="labelCol">
      <a-form-item label="机型">
        <a-select :options="models" v-model:value="formState.model"></a-select>
      </a-form-item>
      <a-form-item label="深色模式">
        <a-switch v-model:checked="formState.darkMode" />
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
        <a-time-picker v-model:value="formState.phoneTime" format="HH:mm" :allowClear="false" style="width:100%;" />
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
        <a-upload v-model:file-list="fileList" name="avatar" list-type="picture-card" class="avatar-uploader"
          :customRequest="handleChange" :show-upload-list="false" :before-upload="beforeUpload" accept="image/*">
          <img v-if="formState.chatBackground" :src="formState.chatBackground" alt="chat background"
            class="ant-upload-image" asp />
          <div v-else>
            <LoadingOutlined v-if="uploadLoading" />
            <PlusOutlined v-else />
            <div class="ant-upload-text">点击上传</div>
          </div>
        </a-upload>
      </a-form-item>
    </a-form>
  </perfect-scrollbar>
</template>

<script setup>
import { reactive, ref } from "vue";
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons-vue';
import dayjs from 'dayjs';
import { models, networkTypes, wifiSignals, phoneSignals } from "@/utils/enum"
import { fileToBase64 } from "@/utils/utils"
import { toast } from "@/utils/feedback"
import useStore from "@/store";
const { useSystemStore } = useStore();

console.log('useSystemStore.appearance.phoneTime: ', useSystemStore.appearance.phoneTime);
const formState = Object.assign({}, useSystemStore.appearance, {
  phoneTime: dayjs(useSystemStore.appearance.phoneTime, 'HH:mm')
});

const labelCol = {
  style: {
    width: "80px",
  },
};

const fileList = ref([]);
const uploadLoading = ref(false);
const handleChange = info => {
  uploadLoading.value = true;
  fileToBase64(info.file).then(base64Data => {
    formState.chatBackground = base64Data;
    uploadLoading.value = false;
  });
};
const beforeUpload = file => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    toast({
      type: "warning",
      content: "只可上传JPG或PNG图片!",
    });
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    toast({
      type: "warning",
      content: "图片大小需小于2MB!",
    });
  }
  return isJpgOrPng && isLt2M;
};
</script>

<style lang="less" scoped>
.avatar-uploader {
  .ant-upload {
    width: 128px;
    height: 128px;
  }

  .ant-upload-select-picture-card {
    i {

      font-size: 32px;
      color: #999;
    }

    .ant-upload-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .ant-upload-text {
      margin-top: 8px;
      color: #666;
    }
  }
}
</style>

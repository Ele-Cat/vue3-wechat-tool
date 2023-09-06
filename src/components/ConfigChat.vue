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
        <GenerateForm :title="addTypeName" :type="activeType" />
        <!-- <p>文本、图片、转账、红包、语音、系统消息、拍一拍、撤回消息、时间</p>
        <p>输入、表情</p>
        <p>拖动上传base64</p>
        <p>转账金额、备注</p>
        <p>红包金额、备注</p>
        <p>语音时间、是否已读</p>
        <p>系统消息</p> -->
      </a-form-item>
    </a-form>
  </perfect-scrollbar>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import { getAssetsFile } from "@/utils/utils"
import GenerateForm from "./common/GenerateForm.vue"

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
const fileList = ref([]);
const handleChange = info => {
  const status = info.file.status;
  if (status !== 'uploading') {
    console.log(info.file, info.fileList);
  }
  if (status === 'done') {
    message.success(`${info.file.name} file uploaded successfully.`);
  } else if (status === 'error') {
    message.error(`${info.file.name} file upload failed.`);
  }
};
function handleDrop(e) {
  console.log(e);
}
</script>

<style lang="less" scoped>
.config-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

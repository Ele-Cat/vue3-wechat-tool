<template>
  <a-upload v-model:file-list="fileList" name="chatBackground" list-type="picture-card" class="avatar-uploader"
    :show-upload-list="false" :customRequest="handleChange" :before-upload="beforeUpload" accept="image/*">
    <CloseCircleOutlined v-if="formState.chatBackground" class="img-remove" title="移除聊天背景"
      @click.stop="removeChatBackground" />
    <img v-if="formState.chatBackground" :src="formState.chatBackground" alt="chat background" class="ant-upload-image" />
    <div v-else>
      <LoadingOutlined v-if="uploadLoading" />
      <PlusOutlined v-else />
      <div class="ant-upload-text">点击上传</div>
    </div>
  </a-upload>
  <span style="font-size:12px;color:#999;">只可上传小于1M的JPG或PNG图片</span>
</template>

<script setup>
import { ref } from "vue";
// import { useFetch } from '@vueuse/core'
import { fileToBase64 } from "@/utils/utils";
import { toast } from "@/utils/feedback";

const fileList = ref([]);
const uploadLoading = ref(false);
const handleChange = (info) => {
  // 用vueuse useFetch上传图片到图床
  // const formData = new FormData();
  // formData.append('image', info.file);
  // const { data } = await useFetch('https://tucdn.wpon.cn/api/upload', {
  //   method: 'POST',
  //   body: formData,
  // }).json();
  // const imgUrl = data.value.data.url;
  // formState.value.chatBackground = imgUrl;
  uploadLoading.value = true;
  fileToBase64(info.file).then((base64Data) => {
    formState.value.chatBackground = base64Data;
    uploadLoading.value = false;
  });
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    toast({
      type: "warning",
      content: "只可上传JPG或PNG图片！",
    });
  }
  const isLt2M = file.size / 1024 / 1024 < 1;
  if (!isLt2M) {
    toast({
      type: "warning",
      content: "图片大小需小于1MB！",
    });
  }
  return isJpgOrPng && isLt2M;
};

const removeChatBackground = () => {
  formState.value.chatBackground = ""
}
</script>

<style></style>
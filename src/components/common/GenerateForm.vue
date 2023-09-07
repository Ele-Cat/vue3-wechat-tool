<template>
  <a-card size="small" :bordered="true" :title="title">
    <a-form :model="formState">
      <template v-if="type === 'text'">
        <a-textarea v-model:value="formState.text" :autoSize="{ minRows: 3, maxRows: 6 }" />
        <!-- <div class="emojis">
          <img :src="getAssetsFile(`/public/emoji/emoji_${i}.png`)" v-for="i in 2" :key="i" alt="">
        </div> -->
      </template>
      <template v-else-if="type === 'image'">
        <a-upload-dragger v-model:fileList="fileList" name="image" :multiple="false" :show-upload-list="false"
          :customRequest="handleChange" :before-upload="beforeUpload" accept="image/*" @drop="handleDrop">
          <p class="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p class="ant-upload-text">点击拖动图片到此区域</p>
        </a-upload-dragger>
      </template>
      <template v-else-if="type === 'transferAccounts'">
        <a-input v-model:value="formState.phoneBattery" :autoSize="{ minRows: 3, maxRows: 6 }" />
      </template>
    </a-form>
    <template #actions>
      <a-button block danger type="link" size="small">清空</a-button>
      <a-button block type="link" size="small">发送</a-button>
    </template>
  </a-card>
</template>

<script setup>
import { reactive, ref } from "vue";
import { InboxOutlined } from '@ant-design/icons-vue';
import { toast } from "@/utils/feedback";

const props = defineProps({
  title: {
    type: String,
    default: "发送类型",
  },
  type: {
    type: String,
    default: "text",
  }
})

const formState = reactive({
  model: "ios",
  phoneBattery: 60,
});

const fileList = ref([]);
const handleChange = info => {
  console.log('info: ', info);
  // const status = info.file.status;
  // if (status !== 'uploading') {
  //   console.log(info.file, info.fileList);
  // }
  // if (status === 'done') {
  //   message.success(`${info.file.name} file uploaded successfully.`);
  // } else if (status === 'error') {
  //   message.error(`${info.file.name} file upload failed.`);
  // }
};
function handleDrop(e) {
  console.log(e);
  console.log(fileList);
  // https://tucdn.wpon.cn/api/upload
}

const beforeUpload = (file) => {
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
</style>
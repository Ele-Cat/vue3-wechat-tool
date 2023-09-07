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
        <a-upload-dragger v-model:fileList="fileList" name="file" :multiple="false"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76" @change="handleChange" @drop="handleDrop">
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
import { reactive } from "vue";
import { InboxOutlined } from '@ant-design/icons-vue';

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
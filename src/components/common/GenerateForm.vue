<template>
  <a-card size="small" :bordered="true" :title="title" class="generate-form">
    <a-form :model="formState" :label-col="{ style: { width: '80px' }}" >
      <template v-if="useChatStore.activeType === 'text'">
        <a-textarea
          ref="textareaRef"
          placeholder="请输入文本"
          v-model:value="formState.text"
          :autoSize="{ minRows: 3, maxRows: 6 }"
        />
        <div class="emojis">
          <Emoji @add="addEmoji" />
        </div>
      </template>
      <template v-else-if="useChatStore.activeType === 'image'">
        <a-upload-dragger
          v-model:fileList="fileList"
          name="image"
          :maxCount="1"
          :multiple="false"
          :show-upload-list="false"
          :customRequest="handleChange"
          :before-upload="beforeUpload"
          accept="image/*"
          @drop="handleChange"
        >
          <p class="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p class="ant-upload-text">点击或拖动图片到此区域</p>
        </a-upload-dragger>
      </template>
      <template v-else-if="useChatStore.activeType === 'transferAccounts'">
        <a-form-item label="转账金额">
          <a-input v-model:value="formState.transferAmount" />
        </a-form-item>
        <a-form-item label="转账备注">
          <a-input v-model:value="formState.transferRemarks" />
        </a-form-item>
      </template>
    </a-form>
    <template #actions v-if="!['image'].includes(useChatStore.activeType)">
      <a-button block danger type="link" size="small" @click="handleClearChat"
        >清空</a-button
      >
      <a-button block type="link" size="small" @click="handleSentChat"
        >发送</a-button
      >
    </template>
  </a-card>
</template>

<script setup>
import { reactive, ref } from "vue";
import { InboxOutlined } from "@ant-design/icons-vue";
import useStore from "@/store";
const { useUserStore, useChatStore } = useStore();
import { fileToBase64 } from "@/utils/utils";
import { toast } from "@/utils/feedback";
import Emoji from "./Emoji.vue";

const props = defineProps({
  title: {
    type: String,
    default: "发送类型",
  },
});

const formState = reactive({
  text: "",
  transferAmount: 88,
  transferRemarks: "",
});

const textareaRef = ref(null);
// 点击表情包的逻辑
const addEmoji = (emoji) => {
  const inputEl = textareaRef.value.$el;
  const selectionStart = inputEl.selectionStart;
  const selectionEnd = inputEl.selectionEnd;
  if (!formState.text) {
    formState.text = `[${emoji}]`;
  } else if (selectionStart === selectionEnd && selectionStart === 0) {
    formState.text += `[${emoji}]`;
  } else if (selectionStart === selectionEnd && selectionStart !== 0) {
    formState.text = formState.text.slice(0, selectionStart) + `[${emoji}]` + formState.text.slice(selectionStart);
  } else if (selectionStart !== selectionEnd) {
    formState.text = formState.text.slice(0, selectionStart) + `[${emoji}]` + formState.text.slice(selectionEnd);
  }
};

const handleSentChat = () => {
  if (!formState.text) {
    toast({
      type: "warning",
      content: "请输入文本后发送",
    });
    return;
  }
  useChatStore.sentChat({
    type: useChatStore.activeType,
    content: formState.text,
    role: useUserStore.activeRole,
  });
  formState.text = "";
};

const handleClearChat = () => {
  formState.text = "";
};

const fileList = ref([]);
const handleChange = (info) => {
  fileToBase64(info.file).then((base64Data) => {
    useChatStore.sentChat({
      type: "image",
      content: base64Data,
      role: useUserStore.activeRole,
    });
  });
};
const beforeUpload = (file) => {
  const isLt2M = file.size / 1024 / 1024 < 1;
  if (!isLt2M) {
    toast({
      type: "warning",
      content: "图片大小需小于1MB！",
    });
  }
  return isLt2M;
};
</script>

<style lang="less" scoped>
.generate-form {
  .emojis {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-around;
    max-height: 136px;
    overflow-y: auto;

    img {
      width: 22px;
      margin: 4px 5px;
    }
  }
}
</style>
<style lang="less">
.generate-form {
  .ant-card-body {
    padding-top: 12px;
  }
  .ant-upload-drag-hover {
    background-color: #90F7EC;
  }
}
</style>
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
          <Suspense>
            <template #default>
              <Emoji @add="addEmoji" />
            </template>
            <template #fallback>
              <div class="default-loading">
                <a-spin tip="加载中..."></a-spin>
              </div>
            </template>
          </Suspense>
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
          <a-input-number :min="0" :precision="2" v-model:value="formState.transferAmount" placeholder="请输入转账金额" />
        </a-form-item>
        <a-form-item label="转账备注">
          <a-input v-model:value="formState.transferRemarks" placeholder="请输入转账备注" />
        </a-form-item>
      </template>
      <template v-else-if="useChatStore.activeType === 'redEnvelope'">
        <a-form-item label="红包金额">
          <a-input-number :min="0" :max="520" :precision="2" v-model:value="formState.redEnvelopeAmount" placeholder="请输入转账金额" />
        </a-form-item>
        <a-form-item label="红包备注">
          <a-input v-model:value="formState.redEnvelopeRemarks" placeholder="请输入转账备注" />
        </a-form-item>
      </template>
      <template v-else-if="useChatStore.activeType === 'radio'">
        <a-form-item label="语音时长">
          <a-input-number :min="0" :max="60" :precision="0" v-model:value="formState.radioDuration" placeholder="请输入语音时长" />
        </a-form-item>
        <a-form-item label="是否已读">
          <a-switch v-model:checked="formState.radioReaded" />
        </a-form-item>
      </template>
      <template v-else-if="useChatStore.activeType === 'time'">
        <a-form-item label="选择时间">
          <div class="datetime-select">
            <a-select :options="toYearStr()" v-model:value="formState.datetime.year" placeholder="年" allowClear></a-select>
            <a-select :options="toArr(13, false, 1, '月')" v-model:value="formState.datetime.month" placeholder="月" allowClear></a-select>
            <a-select :options="toArr(32, false, 1, '日')" v-model:value="formState.datetime.date" placeholder="日" allowClear></a-select>
            <a-select :options="weeks" v-model:value="formState.datetime.week" placeholder="周/昨天" allowClear></a-select>
          </div> 
          <div class="datetime-select">
            <a-select :options="morningAfternoon" v-model:value="formState.datetime.ap" placeholder="上下午" allowClear></a-select>
            <a-select :options="toArr(24)" v-model:value="formState.datetime.hour" placeholder="小时"></a-select>
            <a-select :options="toArr(60)" v-model:value="formState.datetime.minute" placeholder="分钟"></a-select>
          </div>
          预览：<span class="time-preview">{{ selectTime }}</span>
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
import { watch, reactive, ref, defineAsyncComponent } from "vue";
import { InboxOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import dayjs from "dayjs";
import useStore from "@/store";
const { useUserStore, useChatStore } = useStore();
import { fileToBase64, toYearStr, toArr } from "@/utils/utils";
import { weeks, morningAfternoon } from "@/utils/enum";
import { toast } from "@/utils/feedback";
// import Emoji from "./Emoji.vue";
const Emoji = defineAsyncComponent(() => import('./Emoji.vue'));

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
  redEnvelopeAmount: 88,
  redEnvelopeRemarks: "",
  radioDuration: 2,
  radioReaded: true,
  datetime: {
    hour: ('00' + dayjs().get('hour')).slice(-2),
    minute: ('00' + dayjs().get('minute')).slice(-2),
  },
});

const selectTime = ref("")
watch(() => formState.datetime, (newVal) => {
  const showColon = newVal.hour && newVal.minute ? ":" : ""
  selectTime.value =  `${newVal.year || ""}${newVal.month || ""}${newVal.date || ""} ${newVal.week || ""} ${newVal.ap || ""}${newVal.hour || ""}${showColon}${newVal.minute || ""}`
}, {
  immediate: true,
  deep: true,
})

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
  if (!formState.text && useChatStore.activeType === "text") {
    toast({
      type: "warning",
      content: "请输入文本后发送",
    });
    return;
  }
  let content = formState.text;
  let money = 0;
  let duration = 0;
  let readed = 0;
  if (useChatStore.activeType === "transferAccounts") {
    content = formState.transferRemarks;
    money = formState.transferAmount;
  } else if (useChatStore.activeType === "redEnvelope") {
    content = formState.redEnvelopeRemarks;
    money = formState.redEnvelopeAmount;
  } else if (useChatStore.activeType === "radio") {
    duration = formState.radioDuration;
    readed = formState.radioReaded;
  } else if (useChatStore.activeType === "time") {
    content = selectTime.value;
  }
  useChatStore.sentChat({
    type: useChatStore.activeType,
    money,
    content,
    duration,
    readed,
    role: useUserStore.activeRole,
  });
  handleClearChat();
};

const handleClearChat = () => {
  if (useChatStore.activeType === "text") {
    formState.text = "";
  } else if (useChatStore.activeType === "transferAccounts") {
    formState.transferAmount = 88;
    formState.transferRemarks = "";
  } else if (useChatStore.activeType === "redEnvelope") {
    formState.redEnvelopeAmount = 88;
    formState.redEnvelopeRemarks = "";
  }
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
  .datetime-select {
    display: flex;
    align-items: center;
    margin-bottom: 6px;
    .ant-select {
      width: 90px;
      margin-right: 4px;
      &:not(&:nth-of-type(1)) {
        margin-left: 10px;
      }
    }
  }
  .time-preview {
    font-size: 18px;
    color: var(--theme-color);
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
  .ant-input-number {
    width: 100%;
  }
}
</style>
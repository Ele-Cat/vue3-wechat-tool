<template>
  <a-card size="small" :bordered="true" :title="title" class="generate-form">
    <template #extra>
      <a-tooltip title="手机聊天输入框同步展示文本【需配置外观设置中为非语音模式】">
        <a-switch v-if="useChatStore.activeType === 'text' && useUserStore.activeRole === 'own'" :disabled="useSystemStore.appearance.voiceMode" v-model:checked="useSystemStore.appearance.syncInputText" />
      </a-tooltip>
    </template>
    <a-form :model="formState" :label-col="{ style: { width: '80px' }}">
      <template v-if="useChatStore.activeType === 'text'">
        <a-textarea
          ref="textareaRef"
          placeholder="请输入文本"
          v-model:value="formState.text"
          :autoSize="{ minRows: 3, maxRows: 6 }"
          @change="handleTextInput"
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
          <a-input-number :min="0" :max="999999999" :precision="2" v-model:value="formState.transferAmount" placeholder="请输入转账金额" />
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
      <template v-else-if="useChatStore.activeType === 'voice'">
        <a-form-item label="语音时长">
          <a-input-number :min="1" :max="60" :precision="0" v-model:value="formState.voiceDuration" placeholder="请输入语音时长" />
        </a-form-item>
        <a-form-item label="语音文字">
          <a-textarea
            placeholder="语音转文字内容，请注意与语音时长匹配，不填写则不展示"
            v-model:value="formState.voiceContent"
            :autoSize="{ minRows: 3, maxRows: 6 }"
          />
        </a-form-item>
        <a-form-item label="是否已读">
          <a-switch v-model:checked="formState.voiceReaded" />
        </a-form-item>
      </template>
      <template v-else-if="useChatStore.activeType === 'avInvite'">
        <a-form-item label="类型">
          <a-radio-group :options="avInviteTypes" v-model:value="formState.avInviteType" />
          <!-- <a-select :options="avInviteTypes" v-model:value="formState.avInviteType" placeholder="请选择类型"></a-select> -->
        </a-form-item>
        <a-form-item label="状态">
          <a-select :options="avInviteStates" v-model:value="formState.avInviteState" placeholder="请选择状态"></a-select>
        </a-form-item>
        <a-form-item label="时长" v-if="formState.avInviteState === 'success'">
          <div class="datetime-select">
            <a-select :options="toArr(24)" v-model:value="formState.avInviteHour" placeholder="小时"></a-select>
            <a-select :options="toArr(60)" v-model:value="formState.avInviteMinute" placeholder="分钟"></a-select>
            <a-select :options="toArr(60)" v-model:value="formState.avInviteSecond" placeholder="秒"></a-select>
          </div>
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
      <a-button block danger type="link" size="small" @click="handleClearChat">清空</a-button>
      <a-button block type="link" size="small" @click="handleSentChat">发送</a-button>
    </template>
  </a-card>
</template>

<script setup>
import { watch, reactive, ref, defineAsyncComponent } from "vue";
import { InboxOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import dayjs from "dayjs";
import useStore from "@/store";
const { useUserStore, useChatStore, useContextMenuStore, useSystemStore } = useStore();
import { fileToBase64, toYearStr, toArr } from "@/utils/utils";
import { weeks, morningAfternoon, avInviteTypes, avInviteStates } from "@/utils/enum";
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
  redEnvelopeRemarks: "恭喜发财，大吉大利",
  voiceDuration: 2,
  voiceReaded: true,
  voiceContent: "",
  datetime: {
    hour: ('00' + dayjs().get('hour')).slice(-2),
    minute: ('00' + dayjs().get('minute')).slice(-2),
  },
  avInviteType: "audio",
  avInviteState: "",
  avInviteHour: "00",
  avInviteMinute: "00",
  avInviteSecond: "10",
});

const selectTime = ref("")
// 监听时间控件变化，渲染时间预览
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
  useChatStore.inputText = formState.text;
};
const handleTextInput = () => {
  useChatStore.inputText = formState.text;
}

// 点击发送按钮
const handleSentChat = () => {
  if (!formState.text.trim() && useChatStore.activeType === "text") {
    toast({
      type: "warning",
      content: "请输入文本后发送",
    });
    return;
  }
  if (useChatStore.activeType === "avInvite" && !formState.avInviteState) {
    toast({
      type: "warning",
      content: "请选择音、视频状态",
    });
    return;
  }
  let tempObj = {}
  if (useChatStore.activeType === "text") {
    tempObj = {
      content: formState.text.trim(),
    }
  } else if (useChatStore.activeType === "transferAccounts") {
    tempObj = {
      content: formState.transferRemarks.trim(),
      money: formState.transferAmount
    }
  } else if (useChatStore.activeType === "redEnvelope") {
    tempObj = {
      content: formState.redEnvelopeRemarks.trim(),
      money: formState.redEnvelopeAmount
    }
  } else if (useChatStore.activeType === "voice") {
    tempObj = {
      content: formState.voiceContent,
      duration: formState.voiceDuration,
      received: formState.voiceReaded,
    }
  } else if (useChatStore.activeType === "avInvite") {
    const hour = parseInt(formState.avInviteHour) ? `${formState.avInviteHour}:` : ''
    tempObj = {
      type: formState.avInviteType,
      duration: `${hour}${formState.avInviteMinute}:${formState.avInviteSecond}`,
      state: formState.avInviteState,
    }
  } else if (useChatStore.activeType === "time") {
    tempObj = {
      content: selectTime.value,
    }
  }
  useChatStore.sentChat(Object.assign({}, {
    type: useChatStore.activeType,
    role: useUserStore.activeRole,
  }, {...tempObj}));
  handleClearChat();
};

const handleClearChat = () => {
  if (useChatStore.activeType === "text") {
    useChatStore.inputText = formState.text = "";
  } else if (useChatStore.activeType === "transferAccounts") {
    formState.transferAmount = 88;
    formState.transferRemarks = "";
  } else if (useChatStore.activeType === "redEnvelope") {
    formState.redEnvelopeAmount = 88;
    formState.redEnvelopeRemarks = "恭喜发财，大吉大利";
  } else if (useChatStore.activeType === "voice") {
    formState.voiceContent = ""
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
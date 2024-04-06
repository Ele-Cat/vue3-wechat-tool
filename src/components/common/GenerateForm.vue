<template>
  <a-card size="small" :bordered="true" :title="title" class="generate-form">
    <template #extra>
      <a-tooltip title="手机聊天输入框同步展示文本【需配置外观设置中为非语音模式】">
        <a-switch v-if="formType !== 'edit' && activeType === 'text' && useUserStore.activeRole === 'own'" :disabled="useSystemStore.appearance.voiceMode" v-model:checked="useSystemStore.appearance.syncInputText" />
      </a-tooltip>
    </template>
    <a-form :model="formState" :label-col="{ style: { width: '88px' }}">
      <template v-if="activeType === 'text'">
        <a-textarea
          ref="textareaRef"
          placeholder="请输入文本"
          v-model:value="formState.text"
          :autoSize="{ minRows: 3, maxRows: 6 }"
          @change="handleTextInput"
        />
        <perfect-scrollbar class="emojis">
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
        </perfect-scrollbar>
      </template>
      <template v-else-if="activeType === 'image'">
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
          <img v-if="formState.image" :src="formState.image" class="ant-upload-dragger-image" />
          <template v-else>
            <p class="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p class="ant-upload-text">点击或拖动图片到此区域</p>
          </template>
        </a-upload-dragger>
      </template>
      <template v-else-if="activeType === 'transferAccounts'">
        <a-form-item label="转账金额">
          <a-input-number :min="0.01" :max="999999999" :precision="2" v-model:value="formState.transferAmount" placeholder="请输入转账金额" />
        </a-form-item>
        <a-form-item label="转账备注">
          <a-input v-model:value="formState.transferRemarks" placeholder="请输入转账备注" />
        </a-form-item>
      </template>
      <template v-else-if="activeType === 'redEnvelope'">
        <a-form-item label="红包金额">
          <a-input-number :min="0.01" :max="520" :precision="2" v-model:value="formState.redEnvelopeAmount" placeholder="请输入红包金额" />
        </a-form-item>
        <a-form-item label="红包备注">
          <a-input v-model:value="formState.redEnvelopeRemarks" placeholder="请输入转账备注" />
        </a-form-item>
      </template>
      <template v-else-if="activeType === 'voice'">
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
      <template v-else-if="activeType === 'avInvite'">
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
      <template v-else-if="activeType === 'businessCard'">
        <a-form-item label="上传头像">
          <ImageEditor :imageInfo="{
            url: formState.businessCardAvatar,
            width: 100,
            height: 100,
          }" :aspectRatio="1" @use="url => formState.businessCardAvatar = url"></ImageEditor>
        </a-form-item>
        <a-form-item label="名片昵称">
          <a-input v-model:value="formState.businessCardName" placeholder="请输入名片昵称" allowClear></a-input>
        </a-form-item>
      </template>
      <template v-else-if="activeType === 'takeAPat'">
        <a-form-item label="选择对象">
          <a-select :options="patRoles" v-model:value="formState.patRole" placeholder="请选择拍一拍对象"></a-select>
        </a-form-item>
        <a-form-item label="内容">
          <a-input v-model:value="formState.patContent" maxlength="10" placeholder="请输入拍一拍内容，例：的甜筒黏了一手" allowClear></a-input>
          预览：<span class="time-preview">{{ patResult }}</span>
        </a-form-item>
      </template>
      <template v-else-if="activeType === 'time'">
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
      <template v-else-if="activeType === 'revoke'">
        <a-button type="primary" @click="handleSentChat">发一条撤回信息</a-button>
      </template>
      <template v-else-if="activeType === 'system'">
        <a-textarea v-model:value="formState.systemContent" placeholder="请输入系统消息" :autoSize="{ minRows: 3, maxRows: 6 }" allowClear></a-textarea>
      </template>
      <template v-if="['text', 'image', 'voice'].includes(activeType) && ((formType !== 'edit' && useUserStore.activeRole === 'own') || formType === 'edit' && chatInfo.role === 'own')">
        <a-form-item label="消息被拒收" style="margin-top:8px;">
          <a-radio-group :options="ynEnums" v-model:value="formState.rejected" />
        </a-form-item>
      </template>
    </a-form>
    <template #actions v-if="!['revoke'].includes(activeType)">
      <a-button block danger type="link" size="small" @click="handleClearChat">{{ formType === "edit" ? "关闭" : "清空" }}</a-button>
      <a-button block type="link" size="small" @click="handleSentChat">{{ formType === "edit" ? "确认修改" : "发送" }}</a-button>
    </template>
    <!-- <a-form-item label="撤回内容">
      <a-select v-model:value="formState.revokeId" placeholder="请选择要撤回内容" allowClear>
        <a-select-option v-for="item in useChatStore.sendList" :key="item.value" :data-id="item.value" :value="item.value" @mouseenter="handleSendEnter" @mouseleave="handleSendLeave">{{ item.label }}</a-select-option>
      </a-select>
    </a-form-item> -->
  </a-card>
</template>

<script setup>
import { watch, reactive, ref, defineAsyncComponent } from "vue";
import { InboxOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import dayjs from "dayjs";
import useStore from "@/store";
const { useUserStore, useChatStore, useSystemStore, useContextMenuStore } = useStore();
import { fileToBase64, toYearStr, toArr } from "@/utils/utils";
import { weeks, morningAfternoon, avInviteTypes, avInviteStates, patRoles, ynEnums } from "@/utils/enum";
import { toast } from "@/utils/feedback";
import ImageEditor from "@/components/common/ImageEditor.vue";
// import Emoji from "./Emoji.vue";
const Emoji = defineAsyncComponent(() => import('./Emoji.vue'));

const props = defineProps({
  title: {
    type: String,
    default: "发送类型",
  },
  chatInfo: {
    type: Object,
    default: () => {},
  },
  formType: {
    type: String,
    default: "add",
  }
});
const emit = defineEmits(['close'])

let formState = reactive({
  text: "",
  image: "",
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
  businessCardAvatar: "",
  businessCardName: "",
  systemContent: "消息已发出，但被对方拒收了。",
  patRole: "other",
  rejected: false,
});

const activeType = ref("");
watch(() => useChatStore.activeType, (newVal) => {
  activeType.value = newVal;
}, {
  immediate: true,
  deep: true,
})
watch(() => props.chatInfo, (newVal) => {
  if (newVal) {
    // 在这里把数据塞回去
    const { type, ...infoObj } = newVal;
    activeType.value = type;
    if (type === "text") {
      formState.text = infoObj.content;
      formState.rejected = infoObj.rejected;
    } else if (activeType.value === "image") {
      formState.image = infoObj.content;
      formState.rejected = infoObj.rejected;
    } else if (activeType.value === "transferAccounts") {
      formState.transferRemarks = infoObj.content;
      formState.transferAmount = infoObj.money;
    } else if (activeType.value === "redEnvelope") {
      formState.redEnvelopeRemarks = infoObj.content;
      formState.redEnvelopeAmount = infoObj.money;
    } else if (activeType.value === "voice") {
      formState.voiceContent = infoObj.content;
      formState.voiceDuration = infoObj.duration;
      formState.voiceReaded = infoObj.received;
      formState.rejected = infoObj.rejected;
    } else if (activeType.value === "avInvite") {
      let duration = infoObj.duration.split(":");
      formState.avInviteHour = duration.length === 3 ? duration[0] : "00";
      formState.avInviteMinute = duration.length === 3 ? duration[1] : duration[0];
      formState.avInviteSecond = duration.length === 3 ? duration[2] : duration[1];
      formState.avInviteType = infoObj.invateType;
      formState.avInviteState = infoObj.state;
    } else if (activeType.value === "businessCard") {
      formState.businessCardAvatar = infoObj.image;
      formState.businessCardName = infoObj.content;
    } else if (activeType.value === "system") {
      formState.systemContent = infoObj.content;
    }
  }
}, {
  immediate: true,
  deep: true,
})

const selectTime = ref("")
// 监听时间控件变化，渲染时间预览
watch(() => formState.datetime, (newVal) => {
  const showColon = newVal.hour && newVal.minute ? ":" : ""
  selectTime.value = `${newVal.year || ""}${newVal.month || ""}${newVal.date || ""} ${newVal.week || ""} ${newVal.ap || ""}${newVal.hour || ""}${showColon}${newVal.minute || ""}`
}, {
  immediate: true,
  deep: true,
})

const patResult = ref("")
// 监听角色、对象，渲染拍一拍内容
watch(() => [formState.patRole, formState.patContent, useUserStore.activeRole], () => {
  let first = useUserStore.activeRole === "own" ? "我" : ` "${useUserStore.otherInfo.nickname}" `;
  let second = formState.patRole === "own" ? "自己" : ` "${useUserStore.otherInfo.nickname}" `;
  if (useUserStore.activeRole === "other") {
    second = formState.patRole === "own" ? "自己" : "我";
  }
  let patContent = formState.patContent || "";
  patResult.value = `${first}拍了拍${second}${patContent}`;
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
  if (activeType.value === "text" && !formState.text.trim()) {
    toast({
      type: "warning",
      content: "请输入文本后" + (props.formType !== "edit" ? "发送" : "确认修改"),
    });
    return;
  }
  if (activeType.value === "image" && !formState.image) {
    toast({
      type: "warning",
      content: "请选择图片",
    });
    return;
  }
  if (activeType.value === "transferAccounts" && !formState.transferAmount) {
    toast({
      type: "warning",
      content: "请输入转账金额",
    });
    return;
  }
  if (activeType.value === "redEnvelope" && !formState.redEnvelopeAmount) {
    toast({
      type: "warning",
      content: "请输入红包金额",
    });
    return;
  }
  if (activeType.value === "avInvite" && !formState.avInviteState) {
    toast({
      type: "warning",
      content: "请选择音、视频状态",
    });
    return;
  }
  if (activeType.value === "businessCard" && !formState.businessCardAvatar) {
    toast({
      type: "warning",
      content: "请上传名片头像",
    });
    return;
  }
  if (activeType.value === "businessCard" && !formState.businessCardName) {
    toast({
      type: "warning",
      content: "请输入名片昵称",
    });
    return;
  }
  if (activeType.value === "system" && !formState.systemContent) {
    toast({
      type: "warning",
      content: "请输入系统消息",
    });
    return;
  }
  let tempObj = {}
  if (activeType.value === "text") {
    tempObj = {
      content: formState.text.trim(),
      rejected: formState.rejected,
    }
  } else if (activeType.value === "image") {
    tempObj = {
      content: formState.image,
      rejected: formState.rejected,
    }
  } else if (activeType.value === "transferAccounts") {
    tempObj = {
      content: formState.transferRemarks.trim(),
      money: formState.transferAmount
    }
  } else if (activeType.value === "redEnvelope") {
    tempObj = {
      content: formState.redEnvelopeRemarks.trim(),
      money: formState.redEnvelopeAmount
    }
  } else if (activeType.value === "voice") {
    tempObj = {
      content: formState.voiceContent,
      duration: formState.voiceDuration,
      received: formState.voiceReaded,
      rejected: formState.rejected,
    }
  } else if (activeType.value === "avInvite") {
    const hour = parseInt(formState.avInviteHour) ? `${formState.avInviteHour}:` : ''
    tempObj = {
      invateType: formState.avInviteType,
      duration: `${hour}${formState.avInviteMinute}:${formState.avInviteSecond}`,
      state: formState.avInviteState,
    }
  } else if (activeType.value === "businessCard") {
    tempObj = {
      content: formState.businessCardName,
      image: formState.businessCardAvatar,
    }
  } else if (activeType.value === "takeAPat") {
    tempObj = {
      patBold: (useUserStore.activeRole === "own" && formState.patRole === "own") || (useUserStore.activeRole === "other" && formState.patRole === "other"),
      content: patResult.value,
    }
  } else if (activeType.value === "time") {
    tempObj = {
      content: selectTime.value,
    }
  } else if (activeType.value === "system") {
    tempObj = {
      content: formState.systemContent
    }
  }
  if (props.formType !== "edit") {
    // 发送
    useChatStore.sentChat(Object.assign({}, {
      type: activeType.value,
      role: useUserStore.activeRole,
    }, {...tempObj}));
  } else {
    // 修改
    useChatStore.editChat({...props.chatInfo, ...tempObj});
  }
  handleClearChat();
};

const handleClearChat = () => {
  if (props.formType !== "edit") {
    if (activeType.value === "text") {
      useChatStore.inputText = formState.text = "";
    } else if (activeType.value === "image") {
      formState.image = "";
    } else if (activeType.value === "transferAccounts") {
      formState.transferAmount = 88;
      formState.transferRemarks = "";
    } else if (activeType.value === "redEnvelope") {
      formState.redEnvelopeAmount = 88;
      formState.redEnvelopeRemarks = "恭喜发财，大吉大利";
    } else if (activeType.value === "voice") {
      formState.voiceContent = ""
    } else if (activeType.value === "businessCard") {
      formState.businessCardAvatar = ""
      formState.businessCardName = ""
    } else if (activeType.value === "takeAPat") {
      formState.patContent = ""
    } else if (activeType.value === "system") {
      formState.systemContent = "消息已发出，但被对方拒收了。"
    }
  } else {
    emit("close")
  }
};

const fileList = ref([]);
const handleChange = (info) => {
  fileToBase64(info.file).then((base64Data) => {
    formState.image = base64Data;
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

// const handleSendEnter = (e) => {
//   useContextMenuStore.activeChatId = e.target.dataset.id
// }
// const handleSendLeave = (e) => {
//   useContextMenuStore.activeChatId = ""
// }
</script>

<style lang="less" scoped>
.generate-form {
  .emojis {
    display: flex;
    flex-wrap: wrap;
    background-color: #F9F9F9;
    // justify-content: space-around;
    max-height: 136px;
    overflow-y: auto;
    img {
      width: 22px;
      margin: 4px 5px;
    }
  }
  .ant-upload-dragger-image {
    max-width: 100%;
    max-height: 360px;
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
    display: inline-block;
    font-size: 18px;
    color: var(--theme-color);
    margin-top: 12px;
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
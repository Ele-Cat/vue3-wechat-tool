<template>
  <perfect-scrollbar class="config-chat">
    <a-form layout="vertical">
      <a-form-item>
        <slot name="label">
          <div class="config-label">
            <span>选择发送用户</span>
            <a-button type="primary" @click="userManageVisible = true">用户管理</a-button>
          </div>
        </slot>
        <div class="user-select-box">
          <div class="user-item" :class="{active: useUserStore.activeRole === 'own'}" @click="changeRole('own')">
            <img :src="useUserStore.ownInfo.avatar" alt="">
            <p>{{useUserStore.ownInfo.nickname}}</p>
          </div>
          <div class="user-item" :class="{active: useUserStore.activeRole === 'other'}" @click="changeRole('other')">
            <img :src="useUserStore.otherInfo.avatar" alt="">
            <p :title="useUserStore.otherInfo.nickname">{{useUserStore.otherInfo.nickname}}</p>
          </div>
        </div>
      </a-form-item>
    </a-form>
    <a-divider style="border-color: var(--theme-color)" />
    <a-tabs v-model:activeKey="useChatStore.activeType" size="small" tab-position="top">
      <a-tab-pane v-for="addType in addTypes" :disabled="addType.disabled" :key="addType.value" :tab="addType.label"></a-tab-pane>
    </a-tabs>
    <!-- <a-segmented v-model:value="useChatStore.activeType" :options="addTypes" /> -->
    <GenerateForm :title="addTypeName" />
    <!-- <p>文本、表情、图片、转账、红包、语音、时间、音视频邀请、系统消息、拍一拍、撤回消息</p> -->
  </perfect-scrollbar>
  <UserManage :open="userManageVisible" @close="userManageVisible = false" />
</template>

<script setup>
import { ref, watch } from "vue";
import GenerateForm from "./common/GenerateForm.vue"
import UserManage from "./common/UserManage.vue"
import useStore from "@/store";
const { useUserStore, useChatStore } = useStore();
import { addTypes } from "@/utils/enum";

const userManageVisible = ref(false)
const changeRole = (role) => {
  useUserStore.activeRole = role
}

const addTypeName = ref('')
watch(() => [useChatStore.activeType, useUserStore], () => {
  let sendRole = ""
  if (!["time", "system"].includes(useChatStore.activeType)) {
    sendRole = useUserStore.activeRole === 'own' ? '你自己：' : `${useUserStore.otherInfo.nickname}：`
  }
  addTypeName.value = sendRole + addTypes.find(item => item.value === useChatStore.activeType)['label']
}, {
  immediate: true,
  deep: true,
})
</script>

<style lang="less" scoped>
.config-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-select-box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #F5F5F5;
  border-radius: 4px;
  padding: 6px 4px;
  margin-top: 6px;
  .user-item {
    width: 49.5%;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: #E7E7E7;
    }
    &.active {
      background-color: #FFFFFF;
      color: var(--theme-color);
    }
    img {
      width: 56px;
      height: 56px;
      object-fit: cover;
      border-radius: 6px;
    }
    p {
      margin: 2px 0 0 0;
      max-width: 80%;
      font-size: 16px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
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

<style lang="less">
.config-chat {
  .ant-tabs .ant-tabs-tab+.ant-tabs-tab {
    margin: 0 0 0 10px;
  }
}
</style>
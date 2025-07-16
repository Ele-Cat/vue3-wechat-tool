<template>
  <perfect-scrollbar class="config-chat">
    <a-form layout="vertical">
      <a-form-item>
        <slot name="label">
          <div class="config-label">
            <span>编辑和选择用户
              <a-tooltip placement="rightBottom" :overlayStyle="{maxWidth:'800px'}">
                <ExclamationCircleOutlined />
                <template #title>
                  <ol style="padding-left:16px;margin:0;">
                    <li>第一个用户默认是自己</li>
                    <li>点击添加按钮可以添加用户</li>
                    <li>点击头像可以编辑用户头像</li>
                    <li>点击昵称可以编辑用户昵称</li>
                    <li>点击删除按钮可以移除用户</li>
                    <li>点击用户头像右下角可以切换用户</li>
                  </ol>
                </template>
              </a-tooltip>
            </span>
          </div>
        </slot>
        <a-radio-group class="user-select-box" v-model:value="activeUserId">
          <div class="user-item" v-for="(user, index) in useUserStore.userList" :key="user.id">
            <ImageEditor :imageInfo="{
              url: user.avatar,
              width: 60,
              height: 60,
            }" :aspectRatio="1" @use="url => user.avatar = url"></ImageEditor>
            <p v-if="index == 0">{{ user.nickname }}</p>
            <a-input v-else size="small" v-model:value="user.nickname" />
            <a-radio class="user-select" :title="`选择${user.nickname}`" :value="user.id" />
            <a-popconfirm
              title="确认移除这个用户？"
              v-if="index != 0 && useUserStore.userList.length > 2"
              @confirm="handleDeleteUser(user.id)"
            >
              <div class="user-delete" v-if="index != 0 && useUserStore.userList.length > 2">
                <CloseOutlined />
              </div>
            </a-popconfirm>
          </div>
          <div class="user-item add-btn" @click="handleAddUser">
            <PlusOutlined />
          </div>
        </a-radio-group>
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
</template>

<script setup>
import { ref, watch } from "vue";
import { ExclamationCircleOutlined, PlusOutlined, CloseOutlined } from "@ant-design/icons-vue";
import { storeToRefs } from "pinia";
import { addTypes } from "@/utils/enum";
import useStore from "@/store";
const { useUserStore, useChatStore } = useStore();
import GenerateForm from "./common/GenerateForm.vue";
import ImageEditor from "@/components/common/ImageEditor.vue";

const addTypeName = ref('')
watch(() => [useChatStore.activeType, useUserStore], () => {
  let sendRole = ""
  if (!["time", "system"].includes(useChatStore.activeType)) {
    sendRole = useUserStore.activeUserId === 'user-0' ? '你自己：' : `${useUserStore.activeUser.nickname}：`
  }
  addTypeName.value = sendRole + addTypes.find(item => item.value === useChatStore.activeType)['label']
}, {
  immediate: true,
  deep: true,
})

const { activeUserId } = storeToRefs(useUserStore);

const handleAddUser = () => {
  useUserStore.addUser();
}
const handleDeleteUser = (id) => {
  if (id === activeUserId.value) {
    useUserStore.activeUserId = useUserStore.userList[0].id
  }
  useUserStore.deleteUser(id);
}
</script>

<style lang="less" scoped>
.config-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-select-box {
  display: flex;
  // justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  background-color: #F5F5F5;
  border-radius: 4px;
  padding: 16px 0 6px 10px;
  margin-top: 6px;
  .user-item {
    position: relative;
    width: 88px;
    height: 88px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-radius: 4px;
    cursor: pointer;
    margin: 0 10px 10px 0;
    &.active {
      background-color: #FFFFFF;
      color: var(--theme-color);
    }
    .ant-input {
      text-align: center;
    }
    p {
      margin: 2px 0 0 0;
      max-width: 80%;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .user-select {
      position: absolute;
      right: 0;
      bottom: 22px;
    }
    .user-delete {
      position: absolute;
      right: 6px;
      top: -6px;
      background-color: red;
      color: #fff;
      z-index: 999;
      font-size: 12px;
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }
  }
  .add-btn {
    width: 88px;
    height: 88px;
    border: 1px dashed #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: #ccc;
    cursor: pointer;
    transition: all .3s;
    &:hover {
      color: var(--theme-color);
      border: 1px dashed var(--theme-color);
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
<template>
  <a-config-provider :theme="{
    token: {
      colorPrimary: '#FD6585',
    },
  }" :locale="zhCN">
    <a-layout @click="handleAppClick" @contextmenu="handleAppContextMenu">
      <a-layout-header :style="headerStyle">
        <WtHeader />
      </a-layout-header>
      <a-layout class="content" v-if="!isPhone">
        <a-layout-sider :style="siderStyle" :width="useSystemStore.activeMenu === 'chat' ? 640 : 480">
          <WtSider />
        </a-layout-sider>
        <a-layout-content :style="contentStyle">
          <Suspense>
            <template #default>
              <WtContent />
            </template>
            <template #fallback>
              <div class="default-loading">
                <a-spin tip="加载中..."></a-spin>
              </div>
            </template>
          </Suspense>
        </a-layout-content>
      </a-layout>
      <a-layout class="content" v-else>
        <IsPhone />
      </a-layout>
      <!-- <a-layout-footer :style="footerStyle">
        <WtFooter />
      </a-layout-footer> -->
    </a-layout>
    <a href='https://gitee.com/ele-cat/vue3-wechat-tool' target="_blank" class="widget"><img src='https://gitee.com/ele-cat/vue3-wechat-tool/widgets/widget_1.svg?color=FD6585' alt='Fork me on Gitee' /></a>
  </a-config-provider>

  <a-modal v-model:open="modalOpen" title="注意" :maskClosable="false" @ok="handleModalOk" @cancel="handleModalCancel" cancelText="关闭" okText="我已知晓，关闭">
    <Instructions />
  </a-modal>
  <ContextMenu />
</template>

<script setup>
import { onMounted, onUnmounted, ref, defineAsyncComponent } from 'vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');
import WtHeader from "@/components/WtHeader.vue"
import WtSider from "@/components/WtSider.vue"
// import WtContent from "@/components/WtContent.vue"
const WtContent = defineAsyncComponent(() => import('@/components/WtContent.vue'));
// import WtFooter from "@/components/WtFooter.vue"
import Instructions from "@/components/common/Instructions.vue"
import ContextMenu from "@/components/common/ContextMenu.vue"
import IsPhone from "@/components/common/IsPhone.vue"
import useStore from "@/store";
const { useSystemStore, useUserStore, useChatStore, useContextMenuStore } = useStore();
import { ownAvatar, otherAvatar } from "@/utils/avatar";

const headerStyle = {
  height: '50px',
  lineHeight: '50px',
  paddingInline: 0,
  backgroundColor: '#F1F1F1',
};

const contentStyle = {
  backgroundColor: '#FFFFFF',
};

const siderStyle = {
  paddingInline: 0,
  backgroundColor: '#F9F9F9',
};

const footerStyle = {
  textAlign: 'center',
  height: '40px',
  lineHeight: '40px',
  padding: 0,
  backgroundColor: '#F1F1F1',
};

const modalOpen = ref(false);
const showDisclaimerModal = () => {
  modalOpen.value = true;
};
const handleModalOk = e => {
  useSystemStore.hadDisclaimer = true;
  modalOpen.value = false;
};
const handleModalCancel = e => {
  modalOpen.value = false;
};
!useSystemStore.hadDisclaimer && showDisclaimerModal();

onMounted(() => {
  if (!useUserStore.userList.length) {
    // 在这里初始化用户列表吧
    useUserStore.userList = [
      {
        id: "user-0",
        nickname: "你自己",
        avatar: ownAvatar,
        role: "own",
      },
      {
        id: "user-" + Date.now(),
        nickname: "小甜甜",
        avatar: otherAvatar,
        role: "other",
      }
    ]
    useUserStore.activeOther = useUserStore.userList[1]['id'];
  }
  if (!useChatStore.chatList.length) {
    useChatStore.chatList = [
      {
        id: "chat-1",
        type: "text",
        content: "你是谁",
        role: "own",
      },
      {
        id: "chat-2",
        type: "text",
        content: "我是小甜甜~",
        role: "other",
      }
    ]
  }
  handleResize();
  window.addEventListener('resize', handleResize);
})
onUnmounted(() => {
  window.removeEventListener('resize', handleResize);
})

const handleAppClick = () => {
  useContextMenuStore.hideContextMenu();
  useContextMenuStore.activeChat = {};
}
const handleAppContextMenu = (e) => {
  useContextMenuStore.hideContextMenu();
  useContextMenuStore.activeChat = {};
}

const isPhone = ref(false);
const handleResize = () => {
  isPhone.value = window.innerWidth <= 640;
}
</script>

<style lang="less" scoped>
@import url(//at.alicdn.com/t/c/font_4238507_tn4gdu3795p.css);
.content {
  height: calc(100vh - 50px);
}
.widget {
  position: fixed;
  top: 0;
  right: 0;
}
</style>

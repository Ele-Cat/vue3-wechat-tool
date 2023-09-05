<template>
  <a-layout>
    <a-layout-header :style="headerStyle">
      <WtHeader />
    </a-layout-header>
    <a-layout class="content">
      <a-layout-sider :style="siderStyle" width="480">
        <WtSider />
      </a-layout-sider>
      <a-layout-content :style="contentStyle">
        <WtContent />
      </a-layout-content>
    </a-layout>
    <a-layout-footer :style="footerStyle">
      <WtFooter />
    </a-layout-footer>
  </a-layout>
  <a href='https://gitee.com/ele-cat/vue3-wechat-tool' target="_blank" class="widget"><img src='https://gitee.com/ele-cat/vue3-wechat-tool/widgets/widget_1.svg' alt='Fork me on Gitee' /></a>
</template>

<script setup>
import WtHeader from "@/components/WtHeader.vue"
import WtSider from "@/components/WtSider.vue"
import WtContent from "@/components/WtContent.vue"
import WtFooter from "@/components/WtFooter.vue"

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
</script>

<style lang="less" scoped>
@import url(//at.alicdn.com/t/c/font_4238507_tn4gdu3795p.css);
.content {
  height: calc(100vh - 90px);
}
.widget {
  position: fixed;
  top: 0;
  right: 0;
}
</style>

<template>
  <div class="config-instructions notice">
    <div class="notice-header">
      <h2>📢 项目关停公告</h2>
    </div>
    <p class="notice-content">非常遗憾地通知大家，<strong>vue3-wechat-tool 项目将于即日起正式停止维护</strong>。</p>
    <div class="notice-section">
      <h3>关停原因</h3>
      <p>经过深思熟虑，决定暂停该项目的后续开发与维护。望理解！</p>
    </div>
    <div class="notice-section">
      <h3>感谢陪伴</h3>
      <p>感谢每一位 Star、 Fork、提 Issue、贡献代码的朋友，是你们的支持让这个项目走过了这段旅程。</p>
    </div>
    <div class="notice-section">
      <h3>免责声明</h3>
      <p>本程序自始至终仅供娱乐学习，切勿用于任何非法用途。由此产生任何纠纷与项目作者无关。</p>
      <p>源码永久归档：<a href="https://github.com/ele-cat/vue3-wechat-tool" target="_blank">GitHub 仓库</a></p>
    </div>
    <div class="notice-section">
      <h3>后续建议</h3>
      <p>如您需要类似功能，可参考本项目源码进行二次开发，或寻找其他同类替代工具。</p>
    </div>
    <p class="notice-footer">—— vue3-wechat-tool</p>
  </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
.config-instructions {
  &.notice {
    padding: 20px;
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    border-radius: 12px;
    border: 1px solid #f59e0b;
  }
  .notice-header {
    text-align: center;
    margin-bottom: 20px;
    h2 {
      margin: 0;
      color: #b45309;
    }
  }
  .notice-content {
    font-size: 16px;
    text-align: center;
    margin-bottom: 20px;
    strong {
      color: #dc2626;
    }
  }
  .notice-section {
    margin-bottom: 16px;
    h3 {
      font-size: 15px;
      color: #92400e;
      margin: 0 0 8px 0;
    }
    p {
      margin: 0;
      color: #78350f;
    }
  }
  .notice-footer {
    text-align: right;
    color: #92400e;
    font-style: italic;
    margin-top: 20px;
  }
  p {
    font-size: 16px;
    line-height: 1.4;
  }
  a {
    text-decoration: underline;
  }
}
</style>
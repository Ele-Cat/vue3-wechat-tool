<template>
  <div class="wt-header">
    <p data-text="微信对话生成器">微信对话生成器</p>
  </div>
</template>

<script setup>

</script>

<style lang="less" scoped>
.wt-header {
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
    ellipse farthest-side at 40% 0%,
    #1a2327 0%,
    #263238 60%,
    #455a64 100%
  );
  display: flex;
}

p {
  position: relative;
  margin: auto;
  font-size: 32px;
  top: -2px;
  letter-spacing: 0.2em;
  display: inline-block;
  font-weight: bold;
  white-space: nowrap;
  color: transparent;
  background-color: var(--theme-color);
  background-clip: text;
  -webkit-background-clip: text;
}

p::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  background-image: linear-gradient(
    120deg,
    transparent 0%,
    transparent 6rem,
    white 11rem,
    transparent 11.15rem,
    transparent 15rem,
    rgba(255, 255, 255, 0.3) 20rem,
    transparent 25rem,
    transparent 27rem,
    rgba(255, 255, 255, 0.6) 32rem,
    white 33rem,
    rgba(255, 255, 255, 0.3) 33.15rem,
    transparent 38rem,
    transparent 40rem,
    rgba(255, 255, 255, 0.3) 45rem,
    transparent 50rem,
    transparent 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  background-size: 150% 100%;
  background-repeat: no-repeat;
  animation: shine 5s infinite linear;
}

@keyframes shine {
  0% {
    background-position: 190% 0;
  }
  100% {
    background-position: -190% 0;
  }
}
</style>
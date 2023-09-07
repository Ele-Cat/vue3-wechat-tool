<template>
  <perfect-scrollbar>
    <div class="wt-content">
      <!-- <div class="wt-skeleton" v-if="useSystemStore.activeMenu === 'chat'">
        大纲
      </div> -->
      <div class="wt-preview">
        <div class="phone-wrap">
          <div class="phone-scale" :style="{ transform: `scale(${phoneScale})` }">
            <div id="phone" class="phone" :style="{ width: phoneWidth + 'px', height: phoneHeight + 'px' }">
              <div class="phone-bar">
                <div class="phone-time">15:21</div>
                <div class="phone-sigle phone-sigle-v4">信号</div>
                <div class="phone-wifi phone-wifi-s3">wifi</div>
                <div class="phone-battery">
                  <span>
                    <font style="width: 60%;">电量</font> <i></i>
                  </span>
                </div>
              </div>
              <div class="phone-nav">
                <div class="phone-nav-left">
                  <div class="phone-nav-back">返回</div> <span>98</span>
                </div>
                <div class="phone-nav-center"><span>
                    <font>微信对话12</font> <i></i>
                  </span></div>
                <div class="phone-nav-right">
                  <div class="phone-nav-more">更多</div>
                </div>
              </div>
              <div class="phone-body">
                <perfect-scrollbar>
                  <p v-for="i in 500" :key="i">这里写内容{{ i }}</p>
                </perfect-scrollbar>
              </div>
              <div class="phone-bottom">
                <div class="phone-bottom-chat">
                  <div class="wechat-bottom-icon wechat-voice-icon wechat-voice-say-icon">
                    语音
                  </div>
                  <div class="wechat-input wechat-input-say">按住 说话</div>
                  <div class="wechat-bottom-icon wechat-emoji-icon">表情</div>
                  <div class="wechat-bottom-icon wechat-more-icon">更多功能</div>
                </div>
                <div class="phone-bottom-bar"><i>返回桌面</i></div>
              </div>
            </div>
          </div>
        </div>
        <div class="wt-ctrl">
          <div class="wtc-button">生成图片</div>
          <div class="wtc-button">生成动图</div>
          <div class="wtc-button">生成视频</div>
        </div>
      </div>
    </div>
  </perfect-scrollbar>
</template>

<script setup>
import { ref, watch } from "vue";
import useStore from "@/store";
const { useSystemStore } = useStore();
import { models } from "@/utils/enum"

const phoneWidth = ref(1200)
const phoneHeight = ref(2700)
const phoneScale = ref(1)
watch(() => useSystemStore.appearance.model, (newVal) => {
  // ios:1125*2436
  // android:1224*2700
  // 做缩放是为了在预览时好看，同时在生成图片、视频时高清
  const { width, height } = models.find(model => model.value === newVal)
  phoneWidth.value = width
  phoneHeight.value = height
  phoneScale.value = (360 / width).toFixed(2)
}, {
  immediate: true,
})
</script>

<style lang="less" scoped>
.wt-content {
  display: flex;
  justify-content: space-around;
  height: 100%;
  padding: 10px;

  .wt-skeleton {
    width: 40%;
    padding: 10px;
    background-color: #F1F1F1;
  }

  .wt-preview {
    position: relative;

    .phone-wrap {
      width: 360px;
      height: 100%;

      // background-color: #E0E0E0;
      .phone-scale {
        transform-origin: 0 0;
      }

      .phone {
        background-color: #EDEDED;
        position: relative;
        font-size: 36px;

        .phone-bar {
          height: 132px;
          display: flex;
          align-items: center;
          padding: 0 43px 0 95px;
          position: relative;
          z-index: 99999;

          .phone-time {
            font-size: 45px;
            flex: 1;
            font-weight: 600;
          }
        }

        .phone-nav {
          height: 132px;
          position: relative;
          z-index: 99999;
          display: flex;
          align-items: center;
          padding: 0 50px;

          .phone-nav-left {
            width: 150px;
            position: relative;

            .phone-nav-back {
              width: 27px;
              height: 52px;
              background: url(@/assets/images/top/wechat-nav-back.png) no-repeat;
              text-indent: -9999px;
            }

            span {
              position: absolute;
              font-size: 36px;
              height: 72px;
              line-height: 72px;
              background: #d5d5d5;
              min-width: 72px;
              border-radius: 36px;
              text-align: center;
              padding: 0 24px;
              top: 50%;
              margin-top: -36px;
              left: 45px;
              font-weight: 600;
            }
          }

          .phone-nav-center {
            flex: 1;
            display: flex;
            justify-content: center;
          }

          .phone-nav-right {
            width: 150px;
            display: flex;
            justify-content: flex-end;
          }

          &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: .67px;
            background: #d5d5d5;
            overflow: hidden;
            left: 0;
            bottom: 2px;
          }
        }

        .phone-body {
          position: absolute;
          top: 264px;
          bottom: 269px;
          left: 0;
          right: 0;
          -webkit-overflow-scrolling: touch;
          overflow-y: scroll;
        }

        .phone-bottom {
          background: #f6f6f6;
          position: absolute;
          bottom: 0;
          width: 100%;
          height: 269px;
          .phone-bottom-chat {
            height: 167px;
            display: flex;
            align-items: center;
            .wechat-bottom-icon {
              width: 80px;
              height: 80px;
              text-indent: -9999px;
              &.wechat-voice-say-icon {
                background: url(@/assets/images/bottom/wechat-bottom-icon4.png) no-repeat;
              }
              &.wechat-voice-icon {
                background: url(@/assets/images/bottom/wechat-bottom-icon1.png) no-repeat;
                margin-left: 32px;
              }
              &.wechat-emoji-icon {
                background: url(@/assets/images/bottom/wechat-bottom-icon2.png) no-repeat;
              }
              &.wechat-more-icon {
                background: url(@/assets/images/bottom/wechat-bottom-icon3.png) no-repeat;
                margin: 0 32px 0 39px;
              }
            }
            .wechat-input-say {
              color: #1a1a1a;
              font-size: 48px;
              text-indent: 0;
              text-align: center;
              line-height: 120px;
              font-weight: 500;
            }
            .wechat-input {
              height: 120px;
              background: #fff;
              border-radius: 15px;
              flex: 1;
              text-indent: -9999px;
              margin: 0 32px;
            }
          }
          .phone-bottom-bar {
            height: 102px;
            display: flex;
            justify-content: center;
            i {
              width: 402px;
              height: 15px;
              background: url(@/assets/images/bottom/phone-bottom-bar.png) no-repeat;
              margin-top: 63px;
              text-indent: -9999px;
            }
          }
        }
      }
    }

    .wt-ctrl {
      position: absolute;
      top: 50%;
      right: -66px;
      width: 60px;
      transform: translate(0, -50%);

      .wtc-button {
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 12px;
        background-image: linear-gradient(135deg, #FFE985 10%, #FA742B 100%);
        background-image: linear-gradient(135deg, #FFA8A8 10%, #FCFF00 100%);
        background-image: linear-gradient(135deg, #3B2667 10%, #BC78EC 100%);
        background-image: linear-gradient(135deg, #F6D242 10%, #FF52E5 100%);
        background-image: linear-gradient(135deg, #FD6E6A 10%, #FFC600 100%);
        border-radius: 50%;
        margin-bottom: 12px;
        color: #FFFFFF;
      }
    }
  }
}</style>
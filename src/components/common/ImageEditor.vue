<template>
  <div class="upload-box" :style="{ width: `${imageInfo.width}px`, height: `${imageInfo.height}px` }"
    @click="cropperVisible = true">
    <CloseCircleOutlined v-if="imageInfo.url && allowClear" class="img-remove" title="移除聊天背景" @click.stop="handleUse(false)" />
    <img v-if="imageInfo.url" :src="imageInfo.url" class="img-show" alt="图片">
    <div v-else class="img-upload">
      <PlusOutlined />
      <p>点击上传</p>
    </div>
  </div>
  <span style="font-size:12px;color:#999;" v-if="tip">{{tip}}</span>

  <a-modal :title="title" v-model:open="cropperVisible" :width="860" :footer="null" :maskClosable="false" @cancel="handleCancel" destroyOnClose>
    <a-row :gutter="20">
      <a-col :span="16">
        <cropper ref="cropperRef" :src="initImage" class="cropper" :min-height="200" :min-width="200" :stencil-props="{
          aspectRatio,
        }" @change="change" />
        <div style="margin-top:20px">
          <a-space>
            <a-upload v-model:file-list="fileList" name="file" :showUploadList="false" :maxCount="1"
              :customRequest="handleChange" :before-upload="beforeUpload" accept="image/*">
              <a-button type="primary">
                <upload-outlined></upload-outlined>
                {{ initImage ? "重新选择" : "选择图片" }}
              </a-button>
            </a-upload>
            <a-tooltip title="逆时针旋转">
              <a-button type="primary" :disabled="!initImage" shape="circle" :icon="h(UndoOutlined)"
                @click="handleRotate(-90)" />
            </a-tooltip>
            <a-tooltip title="顺时针旋转">
              <a-button type="primary" :disabled="!initImage" shape="circle" :icon="h(RedoOutlined)"
                @click="handleRotate(90)" />
            </a-tooltip>
          </a-space>
        </div>
      </a-col>
      <a-col :span="8">
        <a-space direction="vertical">
          <span>预览</span>
          <img :src="previewImg" :width="200" alt="">
          <a-space>
            <a-button :disabled="!previewImg" type="primary" @click="handleUse">使用</a-button>
            <a-button :disabled="!previewImg" v-if="showDownload" @click="handleDownload">下载到本地</a-button>
          </a-space>
        </a-space>
      </a-col>
    </a-row>
  </a-modal>
</template>

<script setup>
import { ref, watch, h } from 'vue';
import { PlusOutlined, CloseCircleOutlined, UploadOutlined, RedoOutlined, UndoOutlined } from '@ant-design/icons-vue';
import { Cropper, Preview } from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';
import 'vue-advanced-cropper/dist/theme.classic.css';
import { fileToBase64 } from "@/utils/utils";
import { toast } from "@/utils/feedback";

const result = ref({
  coordinates: null,
  image: null
})

const props = defineProps({
  // dialog的标题
  title: {
    type: String,
    default: "图片裁剪",
  },
  // 初始化图片信息
  imageInfo: {
    type: Object,
    default: {
      url: "",
      width: 100,
      height: 100,
    },
  },
  // 裁剪比例
  aspectRatio: {
    type: Number,
    default: 1 / 1,
  },
  // 是否允许清除
  allowClear: {
    type: Boolean,
    default: false,
  },
  // 接收的最大文件大小
  limitSize: {
    type: Number,
    default: 1,
  },
  // 接收的文件类型
  limitAccept: {
    type: Array,
    default: () => ['image/jpeg', 'image/png'],
  },
  // 文件类型不对时的提示
  limitAcceptText: {
    type: String,
    default: "只可上传JPG或PNG图片！",
  },
  // 上传图片提示文字
  tip: {
    type: String,
    default: "",
  },
  // 是否显示下载到本地按钮
  showDownload: {
    type: Boolean,
    default: false,
  }
})

const emit = defineEmits(['use'])

const cropperVisible = ref(false);
const handleUse = (flag = true) => {
  cropperVisible.value = false
  emit('use', flag ? previewImg.value : "")
  handleCancel();
}

const initImage = ref("")
watch(() => cropperVisible.value, (newVal) => {
  if (newVal) {
    initImage.value = props.imageInfo.url;
  }
}, {
  immediate: true,
  deep: true,
})
const handleChange = (info) => {
  fileToBase64(info.file).then((base64Data) => {
    initImage.value = base64Data;
  });
}

const beforeUpload = (file) => {
  const isAccept = props.limitAccept.length === 0 ? true : props.limitAccept.includes(file.type);
  if (!isAccept) {
    toast({
      type: "warning",
      content: props.limitAcceptText,
    });
  }
  const isLtM = file.size / 1024 / 1024 < props.limitSize;
  if (!isLtM) {
    toast({
      type: "warning",
      content: `图片大小需小于${props.limitSize}MB！`,
    });
  }
  return isAccept && isLtM;
};

const cropperRef = ref(null);
const handleRotate = (angle) => {
  cropperRef.value.rotate(angle);
}

const previewImg = ref("")
const change = ({ coordinates, canvas }) => {
  previewImg.value = canvas.toDataURL();
}

const handleDownload = () => {
  const link = document.createElement('a');
  link.href = previewImg.value;
  link.download = `裁剪结果.png`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const handleCancel = () => {
  initImage.value = "";
  previewImg.value = "";
}
</script>

<style lang="less" scoped>
.upload-box {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.02);
  border: 1px dashed #d9d9d9;
  border-radius: 8px;
  cursor: pointer;
  transition: border-color 0.3s;
  color: #666;
  font-size: 14px;

  &:hover {
    border-color: #fd6585;
  }
  .img-remove {
    position: absolute;
    left: 90px;
    top: -8px;
    border-radius: 50%;
    background-color: #FFFFFF;
    font-size: 22px;
    color: #F05F57;
    &:hover {
      color: red;
    }
  }

  .img-show {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .img-upload {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    span {
      font-size: 18px;
      margin-top: 12px;
    }

    p {
      margin-top: 6px;
    }
  }
}

.vue-advanced-cropper__background,
.vue-advanced-cropper__foreground {
  background-color: #f0f0f0;
}

.cropper {
  height: 600px;
  background: #eee;
}</style>
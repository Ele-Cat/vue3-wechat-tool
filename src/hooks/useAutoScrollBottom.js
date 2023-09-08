import { onUpdated, onMounted } from "vue";

/**
 * 执行本方法可以让盒子自动滚动至底
 * @param {ref} component ref绑定的dom
 */
export default function useAutoScrollBottom(component) {
  onUpdated(() => {
    toBottom();
  });

  onMounted(() => {
    toBottom();
  });

  const toBottom = () => {
    if (!component || !component.value) return;
    component.value.scrollTop = component.value.scrollHeight;
  };
}

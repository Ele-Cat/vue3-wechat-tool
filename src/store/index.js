import { useSystemStore } from "./modules/system";
import { useChatStore } from "./modules/chat";
import { useUserStore } from "./modules/user";
import { useTemplateStore } from "./modules/template";
import { useContextMenuStore } from "./modules/contextMenu";

// 将store统一到一起再分发
const useStore = () => ({
  useSystemStore: useSystemStore(),
  useChatStore: useChatStore(),
  useUserStore: useUserStore(),
  useTemplateStore: useTemplateStore(),
  useContextMenuStore: useContextMenuStore(),
});

export default useStore
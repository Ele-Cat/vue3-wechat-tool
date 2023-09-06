import { useSystemStore } from "./modules/system";
import { useChatStore } from "./modules/chat";
import { useContextMenuStore } from "./modules/contextMenu";
import { useUserStore } from "./modules/user";

// 将store统一到一起再分发
const useStore = () => ({
  useSystemStore: useSystemStore(),
  useChatStore: useChatStore(),
  useContextMenuStore: useContextMenuStore(),
  useUserStore: useUserStore(),
});

export default useStore
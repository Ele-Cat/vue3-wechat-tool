import { useSystemStore } from "./modules/system";
import { useChatStore } from "./modules/chat";
import { useContextMenuStore } from "./modules/contextMenu";

// 将store统一到一起再分发
const useStore = () => ({
  useSystemStore: useSystemStore(),
  useChatStore: useChatStore(),
  useContextMenuStore: useContextMenuStore(),
});

export default useStore
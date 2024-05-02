import { useGetChatList } from "@/hooks/queries/useGetChatList";

export const useCheckChatMake = (postId: string) => {
  const { data: chatList } = useGetChatList();

  if (chatList) {
    for (let i = 0; i < chatList.length; i++) {
      if (chatList[i].postId === Number(postId)) return chatList[i].roomId;
    }
  }
  return "";
};

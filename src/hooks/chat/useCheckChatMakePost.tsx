import { useGetChatList } from "@/hooks/queries/useGetChatList";

export const useCheckChatMakePost = (postId: string) => {
  const { data: chatList } = useGetChatList();

  if (chatList) {
    for (let i = 0; i < chatList.length; i++) {
      if (chatList[i].postId === Number(postId)) return chatList[i];
    }
  }
  return null;
};

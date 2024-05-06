import { useMutation } from "@tanstack/react-query";

import ChatApi from "@/api/chat-api";
import { ChatMakeRequest } from "@/api/types/chat-type";

export const usePostMakeChat = () => {
  return useMutation({
    mutationFn: (data: ChatMakeRequest) => ChatApi.postChatMake(data),
  });
};

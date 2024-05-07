import { useMutation } from "@tanstack/react-query";

import ChatApi from "@/api/chat-api";
import { ChatMakeRequest } from "@/api/types/chat-type";

export const usePutChatNewMember = () => {
  return useMutation({
    mutationFn: (data: { chatRoomId: string; addingData: ChatMakeRequest }) =>
      ChatApi.postAddingNewMember(data),
  });
};

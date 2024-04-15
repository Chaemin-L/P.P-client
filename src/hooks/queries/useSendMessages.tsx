import { useMutation } from "@tanstack/react-query";

import ChatApi from "@/api/chat-api";
import { ChatSendRequest } from "@/api/types/chat-type";

export const UseSendMessages = () => {
  return useMutation({
    mutationFn: (sendData: ChatSendRequest) =>
      ChatApi.sendChatMessages(sendData),
  });
};

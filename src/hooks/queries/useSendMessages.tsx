import { useMutation } from "@tanstack/react-query";

import ChatApi from "@/api/chat-api";
import { ChatSendResponse } from "@/api/type";

export const UseSendMessages = (sendData: ChatSendResponse) => {
  return useMutation({
    mutationFn: () => ChatApi.sendChatMessages(sendData),
  });
};

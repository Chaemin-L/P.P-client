import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosResponse, AxiosError } from "axios";

import ChatApi from "@/api/chat-api";
import { ChatSendResponse } from "@/api/type";

export const UseSendMessages = (sendData: ChatSendResponse) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () => ChatApi.sendChatMessages(sendData),
    onSuccess: () => {},
  });
};

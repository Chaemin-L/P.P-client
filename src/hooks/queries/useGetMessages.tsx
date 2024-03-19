import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import ChatApi from "@/api/chat-api";
import { ChatGetResponse } from "@/api/type";

export const useUserData = (roomIdx: number) => {
  return useQuery<ChatGetResponse, AxiosError>({
    queryKey: ["roomIdx", roomIdx],
    queryFn: () => ChatApi.getChatMessages(roomIdx),
  });
};

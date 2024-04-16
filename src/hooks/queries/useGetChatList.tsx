import { useQuery } from "@tanstack/react-query";

import ChatApi from "@/api/chat-api";

export const useGetChatList = () => {
  return useQuery({
    queryKey: ["chat-list"],
    queryFn: () => ChatApi.getChatList(),
  });
};

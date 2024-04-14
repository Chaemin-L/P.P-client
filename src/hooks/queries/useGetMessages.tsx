import { useQuery } from "@tanstack/react-query";

import ChatApi from "@/api/chat-api";

export const useGetMessages = (roomId: string) => {
  return useQuery({
    queryKey: ["chat-messages", roomId],
    queryFn: () => ChatApi.getChatMessages(roomId),
  });
};

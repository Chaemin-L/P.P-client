import { useQuery } from "@tanstack/react-query";

import ChatApi from "@/api/chat-api";

export const useGetChatRoomData = (roomId: string) => {
  return useQuery({
    queryKey: ["chat-room", roomId],
    queryFn: () => ChatApi.getChatRoomData(roomId),
  });
};

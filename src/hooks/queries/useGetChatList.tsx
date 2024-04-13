import { useQuery } from "@tanstack/react-query";

import ChatApi from "@/api/chat-api";
import PostApi from "@/api/post-api";

type tempType = {
  roomId: string;
  postId: number;
  memberCount: number;
  postTitle: string;
  postStatus: string;
  time: string;
  chatMsg: string;
  msgNum: number;
};

export const useGetChatList = () => {
  const { data } = useQuery({
    queryKey: ["chatList"],
    queryFn: () => ChatApi.getChatList(),
  });

  const tempList: tempType[] = [];

  data?.map((item, index) => {
    const { data: postDetail } = useQuery({
      queryKey: ["postDetail"],
      queryFn: () => PostApi.getPostDetail(item.postId),
    });
    if (postDetail) {
      const tempPostDetail = postDetail?.marketPostResponse;
      tempList.push({
        roomId: item.roomId,
        postId: item.postId,
        memberCount: item.memberCount,
        postTitle: tempPostDetail.title,
        postStatus: tempPostDetail.status,
        time: "3분전",
        chatMsg: "샬라샬라",
        msgNum: 3,
      });
    }
  });

  return tempList;
};

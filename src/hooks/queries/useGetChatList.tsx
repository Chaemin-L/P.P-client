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
  console.log("Token: ", localStorage.getItem("accessToken"));
  const { data } = useQuery({
    queryKey: ["chatList"],
    queryFn: () => ChatApi.getChatList(),
  });

  console.log(data);

  const tempList: tempType[] = [];

  // if (data) {
  //   for (let i = 0; i < data.length; i++) {
  //     const { data: postDetail } = useQuery({
  //       queryKey: ["postDetail"],
  //       queryFn: () => PostApi.getPostDetail(data[i].postId),
  //     });
  //     if (postDetail) {
  //       const tempPostDetail = postDetail?.marketPostResponse;
  //       tempList.push({
  //         roomId: data[i].roomId,
  //         postId: data[i].postId,
  //         memberCount: data[i].memberCount,
  //         postTitle: tempPostDetail.title,
  //         postStatus: tempPostDetail.status,
  //         time: "3분전",
  //         chatMsg: "샬라샬라",
  //         msgNum: 3,
  //       });
  //     }
  //   }
  // }
  return tempList;
};

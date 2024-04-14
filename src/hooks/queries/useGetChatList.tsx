import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { useGetPostDetail } from "./useGetPostDetail";

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
  return useQuery({
    queryKey: ["chat-list"],
    queryFn: () => ChatApi.getChatList(),
  });
  // const { data: chatData } = useQuery({
  //   queryKey: ["chat-list"],
  //   queryFn: () => ChatApi.getChatList(),
  // });

  // if (!chatData) return [];

  // const tempList: tempType[] = [];

  // for (let i = 0; i < chatData.length; i++) {
  //   const { data: postDetail } = useGetPostDetail(
  //     chatData[i].postId.toString(),
  //   );
  //   if (postDetail) {
  //     const tempPostDetail = postDetail?.marketPostResponse;
  //     tempList.push({
  //       roomId: chatData[i].roomId,
  //       postId: chatData[i].postId,
  //       memberCount: chatData[i].memberCount,
  //       postTitle: tempPostDetail.title,
  //       postStatus: tempPostDetail.status,
  //       time: "3분전",
  //       chatMsg: "샬라샬라",
  //       msgNum: 3,
  //     });
  //   }
  // }
  // return tempList;
};

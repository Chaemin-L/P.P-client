import { FinalResponse } from "./common-type";

export type ChatGetResponse = {
  id: string;
  roomIdx: number;
  senderName: string;
  senderUuid: string;
  message: string;
  createdAt: string;
};

export type ChatSendResponse = {
  roomIdx: number;
  senderName: string;
  senderUuid: string;
  message: string;
};

export type ChatListItem = {
  roomId: string;
  postId: number;
  memberCount: number;
};

// export type ChatListResponse = FinalResponse<{

// }>

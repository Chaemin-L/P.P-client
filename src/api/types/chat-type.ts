import { StatusType } from "./post-type";

export type ChatSendResponse = {
  roomIdx: number;
  senderName: string;
  senderUuid: string;
  message: string;
};

export type ChatListItemType = {
  roomId: string;
  postId: number;
  memberCount: number;
  title: string;
  status: StatusType;
};

export type ChatFinalResponse<T extends object = Record<string, unknown>> = {
  message: string;
  code: string;
  success: boolean;
  result: T;
};

export type ChatListResponse = ChatFinalResponse<ChatListItemType[]>;

export type ChatRoomMessage = {
  userId: string;
  message: string;
  createdAt: string;
};

export type ChatRoomMember = {
  accountNumber: string;
  nickName: string;
  profileId: number;
  userId: number;
  profileImage: string;
};

export type ChatRoomData = {
  messages: ChatRoomMessage[];
  userInfos: ChatRoomMember[];
};

export type ChatRoomResponse = ChatFinalResponse<ChatRoomData>;

export type ChatRoomMessageList = ChatFinalResponse<ChatRoomMessage[]>;

export type ChatMemberResponse = ChatFinalResponse<{
  userIds: string[];
}>;

export type ChatMakeRequest = {
  postId: number;
  memberIds: string[];
};

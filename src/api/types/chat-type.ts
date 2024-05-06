import { StatusType } from "./post-type";

export type ChatSendRequest = {
  roomId: string;
  message: string;
};

export type ChatListItemType = {
  roomId: string;
  postId: number;
  memberCount: number;
  title: string;
  status: StatusType;
  creatorId: string;
  creatorNickname: string;
  location: string;
  startDate: string;
  deletedPost: boolean;
  blockedRoom: boolean;
};

export type ChatMakeRoom = {
  roomId: string;
  postId: number;
  memberCount: number;
};

export type ChatFinalResponse<T extends object = Record<string, unknown>> = {
  message: string;
  code: string;
  success: boolean;
  result: T;
};

export type ChatListResponse = ChatFinalResponse<ChatListItemType[]>;

export type senderInfo = {
  userId: number;
  profileImage: string;
  nickName: string;
  deleted: boolean;
};

export type ChatRoomMessage = {
  senderInfo: senderInfo | null;
  type: string;
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

export type postInfo = {
  postId: number;
  status: string;
  title: string;
  pay: number;
  dealId: number;
};

export type ChatRoomData = {
  messages: ChatRoomMessage[];
  userInfos: ChatRoomMember[];
  postInfo: postInfo;
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

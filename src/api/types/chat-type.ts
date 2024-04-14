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

export type ChatRoomMessageList = ChatFinalResponse<ChatRoomMessage[]>;

export type ChatMemberResponse = ChatFinalResponse<{
  userIds: string[];
}>;

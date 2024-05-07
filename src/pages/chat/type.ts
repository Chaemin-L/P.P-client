export type ChatDetailState = {
  roomId: string;
  memberCount: number;
};

export type ChatRoomSubMessage = {
  type: string;
  roomIdx: string;
  message: string;
  userId: string;
  createdAt: string;
};

export type ChatRoomData = {
  roomId: string;
  postId: number;
  memberCount: number;
  creatorId: string;
  deletedPost: boolean;
  blockedRoom: boolean;
};

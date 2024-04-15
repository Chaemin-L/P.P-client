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

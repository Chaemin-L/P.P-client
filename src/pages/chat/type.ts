export type ChatDetailState = {
  roomId: string;
  memberCount: number;
};

export type ChatRoomSubMessage = {
  type: string;
  roomIdx: string;
  message: string;
  senderName: string;
  createdAt: string;
};

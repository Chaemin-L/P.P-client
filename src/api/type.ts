export type InstanceResponseData = {
  code: string;
  message: string;
};

export type ChatGetResponse = {
  id: string;
  roomIdx: number;
  senderName: string;
  senderUuid: string;
  message: string;
  createdAt: string;
};

export type BankGetResponse = {
  id: string;
  name: string;
};

export type UserResponse = {
  id: string;
  name: string;
};

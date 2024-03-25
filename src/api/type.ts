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

export type ChatSendResponse = {
  roomIdx: number;
  senderName: string;
  senderUuid: string;
  message: string;
};

export type BankGetResponse = {
  id: string;
  name: string;
};

export type UserResponse = {
  id: string;
  name: string;
};

export type AuthResponse = {
  grantType: string;
  accessToken: string;
  refreshToken: string;
  refreshTokenExpirationTime: number;
  role: string;
};

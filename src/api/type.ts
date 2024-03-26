export type PostingProps = {
  title: string;
  content: string;
  startTime: string;
  slot: string;
  location: string;
  volunteerTime: number;
  marketType: string;
  maxNumOfPeople: number;
  category: string;
};

export type ResponsePostingProps = {
  postId: number;
  title: string;
  content: string;
  createdDate: string;
  status: string;
  startDate: string;
  slot: string;
  location: string;
  pay: number;
  volunteerTime: number;
  marketType: string;
  currentApplicant: number;
  maxNumOfPeople: number;
  category: string;
  dealId: number;
};

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
  status: number;
  code: string;
  msg: string;
  detailMsg: string;
  data: {
    grantType: string;
    accessToken: string;
    refreshToken: string;
    refreshTokenExpirationTime: number;
    role: string;
  };
};

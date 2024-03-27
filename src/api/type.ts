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

export type UserResponse = {
  id: string;
  name: string;
};

export type FinalResponse<T extends object = Record<string, unknown>> = {
  status: number;
  code: string;
  msg: string;
  detailMsg: string;
  data: T;
};

export type AuthResponse = FinalResponse<{
  grantType: string;
  accessToken: string;
  refreshToken: string;
  refreshTokenExpirationTime: number;
  role: string;
}>;

export type BankDataResponse = FinalResponse<{
  accountNumber: string;
  totalBudget: number;
  availableBudget: number;
  isBlocked: boolean;
}>;

export type ProfileDataResponse = FinalResponse<{
  nickNmae: string;
  gender: string;
  address: string;
  ageRange: number;
  accountNumber: string;
  profileImage: string;
}>;

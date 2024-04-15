import { FinalResponse } from "./common-type";

export type ProfileData = {
  userId: number;
  nickName: string;
  gender: string;
  address: string;
  ageRange: number;
  accountNumber: string;
  profileImage: string;
  blocked: boolean;
};

export type ProfileGetResponse = FinalResponse<ProfileData>;

export type ProfilePostRequest = {
  request: {
    nickname: string;
    password: string;
    name: string;
    birth: string;
    gender: string;
    address: string;
  };
  file: string;
};

export type ProfilePostResponse = FinalResponse<{
  userId: number;
  nickName: string;
  gender: string;
  address: string;
  ageRange: number;
  accountNumber: string;
  profileImage: string;
  tokenInfo: {
    grantType: string;
    accessToken: string;
    refreshToken: string;
    refreshTokenExpirationTime: number;
    role: string;
  };
}>;

import { FinalResponse } from "./common-type";

export type ProfileDataResponse = FinalResponse<{
  profileId: number;
  nickName: string;
  gender: string;
  address: string;
  ageRange: number;
  accountNumber: string;
  profileImage: string;
  blocked: boolean;
}>;

export type ProfilePostResponse = FinalResponse<{
  profileId: number;
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

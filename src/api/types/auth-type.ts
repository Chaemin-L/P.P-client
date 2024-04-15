import { FinalResponse } from "./common-type";

export type AuthResponse = FinalResponse<{
  userId: number;
  nickName: string;
  grantType: string;
  accessToken: string;
  refreshToken: string;
  refreshTokenExpirationTime: number;
  role: string;
}>;

import { FinalResponse } from "./common-type";

export type AuthResponse = FinalResponse<{
  userId: number;
  profileId: number;
  grantType: string;
  accessToken: string;
  refreshToken: string;
  refreshTokenExpirationTime: number;
  role: string;
}>;

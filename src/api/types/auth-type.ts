import { FinalResponse } from "./common-type";

export type AuthResponse = FinalResponse<{
  grantType: string;
  accessToken: string;
  refreshToken: string;
  refreshTokenExpirationTime: number;
  role: string;
}>;

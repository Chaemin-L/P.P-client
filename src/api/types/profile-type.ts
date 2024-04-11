import { FinalResponse } from "./common-type";

export type ProfileDataResponse = FinalResponse<{
  nickName: string;
  gender: string;
  address: string;
  ageRange: number;
  accountNumber: string;
  profileImage: string;
  blocked: boolean;
}>;

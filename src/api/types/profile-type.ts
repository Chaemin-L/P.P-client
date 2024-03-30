import { FinalResponse } from "./common-type";

export type ProfileDataResponse = FinalResponse<{
  nickNmae: string;
  gender: string;
  address: string;
  ageRange: number;
  accountNumber: string;
  profileImage: string;
}>;

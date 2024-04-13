import { FinalResponse } from "./common-type";

export type RequestPostingProps = {
  title: string;
  content: string;
  startDate: string;
  location: string;
  volunteerTime: number;
  maxNumOfPeople: number;
};

export type ResponsePostingProps = FinalResponse<marketPostResponse>;

// export type PostType = {
//   postId: number;
//   title: string;
//   content: string;
//   createdDate: string;
//   status: string;
//   startDate: string;
//   location: string;
//   pay: number;
//   volunteerTime: number;
//   currentApplicant: number;
//   maxNumOfPeople: number;
//   dealId: number;
// };

export type UserCurrentStatus = {
  isWriter: boolean;
  isApplicant: boolean;
  applyStatus: string;
};

export type WriterInfo = {
  profileId: number;
  nickName: string;
  profileImage: string;
  address: string;
};

export type marketPostResponse = {
  postId: number;
  title: string;
  content: string;
  createdDate: string;
  status: string;
  startDate: string;
  location: string;
  pay: number;
  volunteerTime: number;
  currentApplicant: number;
  maxNumOfPeople: number;
  dealId: number;
  viewsCount: number;
  writerInfo: WriterInfo;
};

export type PostDetailType = FinalResponse<{
  userCurrentStatus: UserCurrentStatus;
  marketPostResponse: marketPostResponse;
}>;

export type ResponsePostListProps = FinalResponse<marketPostResponse[]>;

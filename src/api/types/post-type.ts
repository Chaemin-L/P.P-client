import { FinalResponse } from "./common-type";

export type RequestPostingProps = {
  title: string;
  content: string;
  startDate: string;
  location: string;
  volunteerTime: number;
  maxNumOfPeople: number;
};

export type ResponsePostingProps = FinalResponse<PostType>;

export type PostType = {
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
};

export type ResponsePostListProps = FinalResponse<PostType[]>;

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

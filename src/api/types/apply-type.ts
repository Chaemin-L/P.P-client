export type ApplyType = {
  applyId: number;
  applicantInfo: {
    userId: number;
    nickName: string;
    profileImage: string;
    address: string;
    gender: string;
    ageRange: number;
  };
  createdTime: string;
  status:
    | "NONE"
    | "WAITING"
    | "TRADING_CANCEL"
    | "TRADING"
    | "TRADING_COMPLETE";
  introduction: string;
  postId: number;
  isAccepted: boolean;
};

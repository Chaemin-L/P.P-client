import { atom } from "recoil";

export const transferState = atom({
  key: "TransferState",
  default: {
    users: [{ nickName: "", userId: 0, blocked: false, profileImg: "" }],
    price: 0,
    availableBudget: 0,
    member: 0,
    postId: "",
    transferState: false,
  },
});

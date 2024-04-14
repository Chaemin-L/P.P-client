import { atom } from "recoil";

export const lastTransferState = atom({
  key: "LastTransferState",
  default: {
    users: [{ nickName: "", userId: 0, blocked: false, profileImg: "" }],
    price: 0,
    availableBudget: 0,
    member: 0,
    postId: "",
    transferState: false,
  },
});

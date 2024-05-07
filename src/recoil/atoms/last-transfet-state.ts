import { atom } from "recoil";

export const lastTransferState = atom({
  key: "LastTransferState",
  default: {
    users: [
      {
        nickName: "",
        userId: 0,
        profileId: 0,
        profileImage: "",
        accountNumber: "",
      },
    ],
    price: 0,
    availableBudget: 0,
    member: 0,
    postId: "",
    dealId: 0,
    transferState: false,
    title: "",
  },
});

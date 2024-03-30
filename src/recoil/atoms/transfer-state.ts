import { atom } from "recoil";

export const transferState = atom({
  key: "TransferState",
  default: {
    users: [{ name: "", userId: "" }],
    price: 0,
    availableBudget: 0,
    member: 0,
  },
});

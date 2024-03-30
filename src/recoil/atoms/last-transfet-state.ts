import { atom } from "recoil";

export const lastTransferState = atom({
  key: "LastTransferState",
  default: {
    users: [{ name: "", userId: "" }],
    price: 0,
    availableBudget: 0,
    member: 0,
  },
});

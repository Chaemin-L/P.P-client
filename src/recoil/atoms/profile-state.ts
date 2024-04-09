import { atom } from "recoil";

export const profileState = atom({
  key: "profileState",
  default: {
    nickname: "",
    password: "",
    name: "",
    birth: "",
    gender: "",
    address: "",
    file: "",
  },
});

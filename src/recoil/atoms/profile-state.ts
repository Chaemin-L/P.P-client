import { atom } from "recoil";

export const profileState = atom({
  key: "profileState",
  default: {
    nickName: "",
    password: "",
    name: "",
    birth: "",
    gender: "",
    address: "",
    file: "",
  },
});

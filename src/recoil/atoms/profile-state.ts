import { atom } from "recoil";

export const profileState = atom({
  key: "profileState",
  default: {
    request: {
      nickName: "",
      password: "",
      name: "",
      birth: "",
      gender: "",
      address: "",
    },
    file: "",
  },
});

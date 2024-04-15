import { atom } from "recoil";

export const profileState = atom({
  key: "profileState",
  default: {
    request: {
      nickName: "",
      password: "",
      name: "이채민", // dummy
      birth: "",
      gender: "",
      address: "정릉 3동", // dummy
    },
    file: "",
  },
});

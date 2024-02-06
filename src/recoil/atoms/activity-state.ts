import { atom } from "recoil";

export const activityState = atom({
  key: "activityState",
  default: {
    title: "",
    profileImage: "",
    time: "",
    date: "",
    location: "",
    memberNum: "",
    readOnly: true,
  },
});

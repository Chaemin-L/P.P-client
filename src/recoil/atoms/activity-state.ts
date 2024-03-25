import { atom } from "recoil";

export const activityState = atom({
  key: "activityState",
  default: {
    title: "",
    description: "",
    author: {
      id: 0,
      name: "",
      imageUrl: "",
    },
    profileImage: "",
    time: "",
    date: "",
    location: "",
    memberNum: "",
    readOnly: true,
  },
});

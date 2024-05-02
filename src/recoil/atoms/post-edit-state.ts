import { atom } from "recoil";

export const postEditState = atom({
  key: "postEditState",
  default: {
    title: "",
    content: "",
    startDate: "",
    location: "",
    maxNumOfPeople: 0,
    volunteerTime: 0,
  },
});

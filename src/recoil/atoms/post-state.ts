import { atom } from "recoil";

export const postState = atom({
  key: "postState",
  default: {
    userCurrentStatus: {
      isWriter: false,
      isApplicant: false,
      applyId: 0,
      applyStatus: "",
    },
    marketPostResponse: {
      postId: 0,
      title: "",
      content: "",
      location: "",
      startDate: "",
      pay: 0,
      volunteerTime: 0,
      createdDate: "",
      status: "RECRUITING",
      currentApplicant: 0,
      maxNumOfPeople: 0,
      viewsCount: 0,
      dealId: 0,
      writerInfo: {
        userId: 0,
        nickName: "",
        profileImage: "",
        address: "",
        gender: "",
        ageRange: 0,
      },
    },
  },
});

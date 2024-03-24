import React, { Dispatch, SetStateAction } from "react";

export type TimeType = "오전" | "오후" | "무관";

export type ActivityBoxContextType = {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
  profileImage: string;
  setProfileImage: Dispatch<SetStateAction<string>>;
  time: TimeType | null;
  setTime: Dispatch<SetStateAction<TimeType | null>>;
  date: string;
  setDate: Dispatch<SetStateAction<string>>;
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
  memberNum: string;
  readOnly: boolean;
  setReadOnly: Dispatch<SetStateAction<boolean>>;
};

export type BottomSheetProps = {
  children: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "type">;

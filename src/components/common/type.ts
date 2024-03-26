import React, { Dispatch, SetStateAction, ChangeEvent } from "react";

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

export type SelectToggleType = {
  state: boolean;
  onClick?: () => void;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export type TopBarProps = {
  onClick?: () => void;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export type InputType = {
  children?: React.ReactNode;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

export type BottomSheetProps = {
  children: React.ReactNode;
  onChangeIsOpened: (newValue: boolean) => void;
  isOpened: boolean;
} & Omit<React.HTMLAttributes<HTMLElement>, "type">;

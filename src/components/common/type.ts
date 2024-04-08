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

export type ToggleType = {
  state?: boolean;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export type InputType = {
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
};

export type BottomSheetProps = {
  children: React.ReactNode;
  onChangeIsOpened: () => void;
  isOpened: boolean;
} & Omit<React.HTMLAttributes<HTMLElement>, "type">;

export type SwitchToggleType = {
  firstText: string;
  secondText: string;
  onChangeSelected: (newValue: boolean) => void;
  isLeftSelected: boolean;
};

export type AppBarProps = {
  isFixed?: boolean;
  isColorMode?: boolean;
  isBorderExist?: boolean;
  isBigSizeText?: boolean;
  children?: React.ReactNode;
} & Omit<React.HTMLAttributes<HTMLElement>, "type">;

export type HamburgerProps = {
  isColorMode?: boolean;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;

import { ChangeEvent } from "react";

export type CustomHeaderProps = {
  date: Date;
  decreaseMonth: () => void;
  increaseMonth: () => void;
};

export type DatePickerProps = {
  startDate: Date;
  setStartDate: (value: React.SetStateAction<Date>) => void;
};

export type PostingAppBarProps = {
  nowPage: number;
} & Omit<React.HTMLAttributes<HTMLElement>, "type">;

export type TextAreaType = {
  value: string | number;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  children?: React.ReactNode;
};

import React, { ChangeEvent } from "react";

export type MyChatType = {
  children?: React.ReactNode;
};

export type OtherChatType = {
  children?: React.ReactNode;
  userId?: number;
  imgurl?: string;
};

export type InputType = {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "type">;

export type ChatRoomItemType = {
  roomIdx: string;
  name: string;
  chatMsg: string;
  time: string;
};

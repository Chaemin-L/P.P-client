import React, { ChangeEvent } from "react";

import { AppBarProps } from "@/components/common/type";

export type MyChatType = {
  children?: React.ReactNode;
};

export type ChatItemType = {
  children?: React.ReactNode;
  userId?: number;
  imgurl?: string;
  userName: string;
};

export type InputType = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setHeight: (value: number) => void;
};

export type ChatRoomItemType = {
  roomIdx: string;
  name: string;
  chatMsg: string;
  time: string;
};

export type ChatAppBarType = {
  name: string;
  setAppBarHeight: (value: number) => void;
  onClickTransfer: () => void;
  onClickReport: () => void;
};

import React, { ChangeEvent } from "react";

export type MyChatType = {
  children?: React.ReactNode;
};

export type ChatItemType = {
  children?: React.ReactNode;
  userId: number;
  imgurl?: string;
  userName: string;
  setProfileModal: React.Dispatch<React.SetStateAction<boolean>>;
  setProfileUserId: React.Dispatch<React.SetStateAction<number>>;
};

export type InputType = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  // setHeight: (value: number) => void;
  onFocus: React.Dispatch<React.SetStateAction<boolean>>;
};

export type ChatRoomItemType = {
  roomIdx: string;
  name: string;
  chatMsg: string;
  time: string;
  transferState: boolean;
  msgNum: number;
};

export type ChatAppBarType = {
  name: string;
  setAppBarHeight: (value: number) => void;
  onClickTransfer: () => void;
  onClickReport: () => void;
};

export type ChatProfileModalType = {
  userId: number;
  onClose: () => void;
};

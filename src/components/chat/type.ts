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
  // setHeight: (value: number) => void;
  onFocus: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: (inputValue: string) => void;
};

export type ChatRoomItemType = {
  roomId: string;
  postId: number;
  memberCount: number;
  postTitle: string;
  postStatus: string;
  time: string;
  chatMsg: string;
  msgNum: number;
  creatorId: string;
};

export type ChatAppBarType = {
  setAppBarHeight: (value: number) => void;
  onClickTransfer: () => void;
  onClickReport: () => void;
  postId: string;
  setErrorModal: () => void;
  memberCount: number;
  creatorId: string;
};

export type ChatInRoomUser = {
  nickName: string;
  userId: number;
  profileImg: string;
  blocked: boolean;
};

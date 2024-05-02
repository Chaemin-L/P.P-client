import { MouseEvent } from "react";

import { ApplyType } from "@/api/types/apply-type";
import { ChatMakeRoom } from "@/api/types/chat-type";

export type ApplicantItemDetailProps = {
  selected: boolean;
  onSelect: (event: MouseEvent<HTMLButtonElement>) => void;
} & ApplyType;

export type ApplicantItemProps = {
  data: ApplyType[];
  applyIds: ApplyListType[];
  setApplyIds: (value: React.SetStateAction<ApplyListType[]>) => void;
  isRecruiting: boolean;
  originApplyIds: ApplyListType[];
  setApplyModal: (value: React.SetStateAction<string>) => void;
};

export type ApplyListType = {
  applyId: number;
  userId: number;
};

export type ApplicantModifyModalProps = {
  setIsApplyChangeCheck: (value: React.SetStateAction<boolean>) => void;
  applyIds: ApplyListType[];
  originApplyIds: ApplyListType[];
  postId: string;
  chatRoomId: string;
  isPage?: boolean;
  setChatMakeRoomId?: (
    value: React.SetStateAction<ChatMakeRoom | null>,
  ) => void;
  setApplyModal?: (value: React.SetStateAction<string>) => void;
  setStatusChangeModal: (value: React.SetStateAction<boolean>) => void;
  setIsApplyError: (value: React.SetStateAction<string>) => void;
};

export type ApplicantListBottomSheetProps = {
  postId: string;
  chatId: string;
  onFinishApply: () => void;
};

export type ApplicantOnlyDeleteProps = {
  applyIds: ApplyListType[];
  postId: string;
  setApplyModal: (value: React.SetStateAction<string>) => void;
  setStatusChangeModal: (value: React.SetStateAction<boolean>) => void;
};

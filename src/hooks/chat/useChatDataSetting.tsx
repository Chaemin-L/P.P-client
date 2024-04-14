import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";

import PostApi from "@/api/post-api";
import { ChatListItemType } from "@/api/types/chat-type";
import { useGetBankData } from "@/hooks/queries/useGetBankData";
import { useGetChatMembers } from "@/hooks/queries/useGetChatMembers";
import { useGetPostDetail } from "@/hooks/queries/useGetPostDetail";
import { lastTransferState } from "@/recoil/atoms/last-transfet-state";
import { transferState } from "@/recoil/atoms/transfer-state";

export const useChatDataSetting = (props: ChatListItemType) => {
  const setTransfer = useSetRecoilState(transferState);
  const setLastTransfer = useSetRecoilState(lastTransferState);
  const { data: postData } = useGetPostDetail(props.postId.toString());
  const { data: myBankData } = useGetBankData();
  const { finalMembers, members } = useGetChatMembers(props.roomId);

  if (finalMembers && postData && myBankData) {
    setTransfer({
      users: finalMembers,
      price: postData?.marketPostResponse.pay,
      availableBudget: myBankData?.availableBudget,
      member: props.memberCount,
      postId: props.postId.toString(),
      transferState:
        postData?.marketPostResponse.status === "TRANSACTION_COMPLETED",
    });
    setLastTransfer({
      users: finalMembers,
      price: postData?.marketPostResponse.pay,
      availableBudget: myBankData?.availableBudget,
      member: props.memberCount,
      postId: props.postId.toString(),
      transferState:
        postData?.marketPostResponse.status === "TRANSACTION_COMPLETED",
    });
  }
};

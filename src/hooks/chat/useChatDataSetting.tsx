import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { ChatListItemType, ChatRoomMember } from "@/api/types/chat-type";
import { useGetBankData } from "@/hooks/queries/useGetBankData";
import { useGetChatRoomData } from "@/hooks/queries/useGetChatRoomData";
import { useGetPostDetail } from "@/hooks/queries/useGetPostDetail";
import { lastTransferState } from "@/recoil/atoms/last-transfet-state";
import { transferState } from "@/recoil/atoms/transfer-state";

export const useChatDataSetting = (props: ChatListItemType) => {
  const setTransfer = useSetRecoilState(transferState);
  const setLastTransfer = useSetRecoilState(lastTransferState);

  const { data: roomData } = useGetChatRoomData(props.roomId);
  const { data: postData } = useGetPostDetail(props.postId.toString());
  const { data: bankData } = useGetBankData();

  console.log("roomData: ", roomData);
  console.log("postData: ", postData);

  useEffect(() => {
    const myId = localStorage.getItem("userId") || "0";
    const users: ChatRoomMember[] =
      roomData?.userInfos?.filter((item) => item.userId !== Number(myId)) || [];

    // console.log("useEffect!!!! users:::: ", users);
    // console.log("useEffect!!!! users:::: ");
    const price: number = postData ? postData.marketPostResponse.pay : 0;
    const status: boolean =
      postData?.marketPostResponse?.status === "TRANSACTION_COMPLETED";
    const dealId: number = postData ? postData.marketPostResponse.dealId : 0;
    const availableBudget: number = bankData ? bankData.availableBudget : 0;

    setTransfer({
      users: users,
      price: price,
      availableBudget: availableBudget,
      member: users.length,
      postId: props.postId.toString(),
      dealId: dealId,
      transferState: status,
    });

    setLastTransfer({
      users: users,
      price: price,
      availableBudget: availableBudget,
      member: users.length,
      postId: props.postId.toString(),
      dealId: dealId,
      transferState: status,
    });
  }, [roomData]);

  return roomData?.messages;
};

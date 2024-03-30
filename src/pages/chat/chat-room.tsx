import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { allMsg } from "./dummy";

import { ChatAppBar } from "@/components/chat/chat-app-bar";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatItem } from "@/components/chat/chat-item";
import { BottomSheet } from "@/components/common/bottom-sheet";
import { Transfer } from "@/components/transfer/transfer";
import { lastTransferState } from "@/recoil/atoms/last-transfet-state";
import { transferState } from "@/recoil/atoms/transfer-state";
// import SockJS from "sockjs-client";
// import Stomp from "stompjs";

export const ChatRoom = () => {
  const [msg, setMsg] = useState("");
  const [isBottomSheetOpened, setIsBottomSheetOpened] = useState(false);
  const [appBarHeight, setAppBarHeight] = useState(0);
  const [chatInputHeight, setChatInputHeight] = useState(0);
  console.log(appBarHeight);

  const [transfer, setTransfer] = useRecoilState(transferState);
  const [lastTransfer, setLastTransfer] = useRecoilState(lastTransferState);

  useEffect(() => {
    setTransfer({
      users: [
        { name: "김철수", userId: "1" },
        { name: "홍철수", userId: "2" },
        { name: "김길동", userId: "3" },
        { name: "홍길동", userId: "4" },
        { name: "김민정", userId: "5" },
        { name: "홍민정", userId: "6" },
        { name: "김민지", userId: "7" },
        { name: "홍민지", userId: "8" },
        { name: "김현지", userId: "9" },
        { name: "홍현지", userId: "10" },
      ],
      price: 30,
      availableBudget: 4000,
      member: 10,
    });
    setLastTransfer({
      users: [
        { name: "김철수", userId: "1" },
        { name: "홍철수", userId: "2" },
        { name: "김길동", userId: "3" },
        { name: "홍길동", userId: "4" },
        { name: "김민정", userId: "5" },
        { name: "홍민정", userId: "6" },
        { name: "김민지", userId: "7" },
        { name: "홍민지", userId: "8" },
        { name: "김현지", userId: "9" },
        { name: "홍현지", userId: "10" },
      ],
      price: 30,
      availableBudget: 4000,
      member: 10,
    });
  }, [setTransfer, setLastTransfer]);

  return (
    <PageContainer>
      <ChatAppBar
        name="test"
        onClickTransfer={() => {
          setIsBottomSheetOpened(true);
        }}
        setAppBarHeight={setAppBarHeight}
      />
      <ChatList
        style={{
          paddingTop: `${appBarHeight + 10}px`,
          paddingBottom: `${chatInputHeight + 10}px`,
        }}
      >
        {allMsg.map((item, index) => {
          return (
            <ChatItem key={index} userName={item.senderName}>
              {item.message}
            </ChatItem>
          );
        })}
      </ChatList>
      <ChatInput
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        setHeight={setChatInputHeight}
      />

      <BottomSheet
        style={{ height: window.innerHeight > 720 ? "81%" : "90%" }}
        isOpened={isBottomSheetOpened}
        onChangeIsOpened={setIsBottomSheetOpened}
      >
        <Transfer />
      </BottomSheet>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  height: 100%;
`;

const ChatList = styled.div`
  overflow: scroll;
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;

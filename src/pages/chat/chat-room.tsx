import React, { useEffect, useState, useRef } from "react";
import { styled } from "styled-components";

import { allMsg } from "./dummy";

import { ChatAppBar } from "@/components/chat/chat-app-bar";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatItem } from "@/components/chat/chat-item";
import { BottomSheet } from "@/components/common/bottom-sheet";
import { Transfer } from "@/components/transfer/transfer";
// import SockJS from "sockjs-client";
// import Stomp from "stompjs";

export const ChatRoom = () => {
  const [msg, setMsg] = useState("");
  const [isBottomSheetOpened, setIsBottomSheetOpened] = useState(false);
  const [appBarHeight, setAppBarHeight] = useState(0);
  const [chatInputHeight, setChatInputHeight] = useState(0);
  console.log(appBarHeight);

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
        <Transfer availableBudget={6000} member={6} price={230} />
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

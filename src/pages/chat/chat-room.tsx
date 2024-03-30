import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { styled } from "styled-components";

import { allMsg, tempList } from "./dummy";

import { ChatAppBar } from "@/components/chat/chat-app-bar";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatItem } from "@/components/chat/chat-item";
import { BottomSheet } from "@/components/common/bottom-sheet";
import { Report } from "@/components/report/report";
import { Transfer } from "@/components/transfer/transfer";
import { lastTransferState } from "@/recoil/atoms/last-transfet-state";
import { transferState } from "@/recoil/atoms/transfer-state";
// import SockJS from "sockjs-client";
// import Stomp from "stompjs";

export const ChatRoom = () => {
  const [appBarHeight, setAppBarHeight] = useState(0);
  const [chatInputHeight, setChatInputHeight] = useState(0);

  const [isBottomSheetOpened, setIsBottomSheetOpened] = useState(false);
  const [isTransfer, setIsTransfer] = useState(false);
  const [isReport, setIsReport] = useState(false);
  const setTransfer = useSetRecoilState(transferState);
  const setLastTransfer = useSetRecoilState(lastTransferState);

  const [msg, setMsg] = useState("");

  useEffect(() => {
    setTransfer(tempList);
    setLastTransfer(tempList);
  }, [setTransfer, setLastTransfer]);

  return (
    <PageContainer>
      <ChatAppBar
        name="test"
        onClickTransfer={() => {
          setIsBottomSheetOpened(true);
          setIsTransfer(true);
        }}
        setAppBarHeight={setAppBarHeight}
        onClickReport={() => {
          setIsBottomSheetOpened(true);
          setIsReport(true);
        }}
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
        onChangeIsOpened={() => {
          setIsBottomSheetOpened(false);
          setIsReport(false);
          setIsTransfer(false);
        }}
      >
        {isTransfer && <Transfer />}
        {isReport && (
          <Report
            postId=""
            onSuccessReport={() => {
              setIsBottomSheetOpened(false);
              setIsReport(false);
              //신고완료 모달창 띄우기
            }}
          />
        )}
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

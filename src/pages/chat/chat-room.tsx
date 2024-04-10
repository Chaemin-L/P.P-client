import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";

import { allMsg, tempList } from "./dummy";
import { ChatDetailState } from "./type";

import { ChatAppBar } from "@/components/chat/chat-app-bar";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatItem } from "@/components/chat/chat-item";
import { ChatProfileModal } from "@/components/common/chat-profile-modal";
import { BottomSheet } from "@/components/common/bottom-sheet";
import { Modal } from "@/components/common/modal";
import { Report } from "@/components/report/report";
import { Transfer } from "@/components/transfer/transfer";
import { useGetBankData } from "@/hooks/queries/useGetBankData";
import { lastTransferState } from "@/recoil/atoms/last-transfet-state";
import { transferState } from "@/recoil/atoms/transfer-state";
// import SockJS from "sockjs-client";
// import Stomp from "stompjs";

export const ChatRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as ChatDetailState;

  const [appBarHeight, setAppBarHeight] = useState(0);
  const [appBerVisibility, setAppBarVisibility] = useState(true);
  // const [chatInputHeight, setChatInputHeight] = useState(0);

  const [isBottomSheetOpened, setIsBottomSheetOpened] = useState(false);
  const [isTransfer, setIsTransfer] = useState(false);
  const [isReport, setIsReport] = useState(false);
  const setTransfer = useSetRecoilState(transferState);
  const setLastTransfer = useSetRecoilState(lastTransferState);
  const [reportModal, setReportModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);

  const [profileUserId, setProfileUserId] = useState<number>(0);

  const { data } = useGetBankData();

  const [msg, setMsg] = useState("");

  useEffect(() => {
    setTransfer({
      ...tempList,
      availableBudget: data ? data.availableBudget : 4000,
    });
    setLastTransfer({
      ...tempList,
      availableBudget: data ? data.availableBudget : 4000,
    });
  }, [setTransfer, setLastTransfer]);

  return (
    <PageContainer>
      {appBerVisibility && (
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
      )}
      <ChatList
        style={{
          paddingTop: appBerVisibility ? `${appBarHeight + 10}px` : "10px",
        }}
      >
        {allMsg.map((item, index) => {
          return (
            <ChatItem
              key={index}
              userId={item.senderUuid}
              userName={item.senderName}
              setProfileModal={setProfileModal}
              setProfileUserId={setProfileUserId}
            >
              {item.message}
            </ChatItem>
          );
        })}
      </ChatList>
      <ChatInput
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        onFocus={setAppBarVisibility}
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
        {isTransfer && (
          <Transfer
            onClick={() => {
              setIsBottomSheetOpened(false);
              setIsTransfer(false);
            }}
            memberCount={state.memberCount}
          />
        )}
        {isReport && (
          <Report
            postId=""
            onSuccessReport={() => {
              setIsBottomSheetOpened(false);
              setIsReport(false);
              setReportModal(true);
              //신고완료 모달창 띄우기
            }}
          />
        )}
      </BottomSheet>
      {reportModal && (
        <Modal
          onClose={() => {
            setReportModal(false);
            navigate("/chat");
          }}
        >
          <Modal.Title text="신고가 접수되었습니다." />
        </Modal>
      )}
      {profileModal && (
        <ChatProfileModal
          userId={profileUserId}
          onClose={() => {
            setProfileModal(false);
          }}
        />
      )}
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
  padding-bottom: 70px;
`;

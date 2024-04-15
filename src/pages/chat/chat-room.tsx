import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { styled } from "styled-components";

import { allMsg, tempList } from "./dummy";

import { ChatListItemType } from "@/api/types/chat-type";
import { ChatAppBar } from "@/components/chat/chat-app-bar";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatItem } from "@/components/chat/chat-item";
import { BottomSheet } from "@/components/common/bottom-sheet";
import { Modal } from "@/components/common/modal";
import { ProfileModal } from "@/components/common/profile-modal";
import { Report } from "@/components/report/report";
import { Transfer } from "@/components/transfer/transfer";
import { useChatDataSetting } from "@/hooks/chat/useChatDataSetting";
import { transferState } from "@/recoil/atoms/transfer-state";
// import SockJS from "sockjs-client";
// import Stomp from "stompjs";

export const ChatRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as ChatListItemType;

  const [transfer, setTransfer] = useRecoilState(transferState);
  const roomMsgs = useChatDataSetting(state);
  console.log(transfer);

  const [appBarHeight, setAppBarHeight] = useState(0);
  const [appBerVisibility, setAppBarVisibility] = useState(true);
  // const [chatInputHeight, setChatInputHeight] = useState(0);

  const [isBottomSheetOpened, setIsBottomSheetOpened] = useState(false);
  const [isTransfer, setIsTransfer] = useState(false);
  const [isReport, setIsReport] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  const [profileUserId, setProfileUserId] = useState<number>(0);
  const [msg, setMsg] = useState("");

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
          postId={state.postId.toString()}
          setErrorModal={() => {
            setErrorModal(true);
          }}
        />
      )}
      <ChatList
        style={{
          paddingTop: appBerVisibility ? `${appBarHeight + 10}px` : "10px",
        }}
      >
        {roomMsgs?.map((item, index) => {
          const temp = transfer.users.find((e) => {
            e.userId === Number(item.userId);
            // console.log("roomMsgMap:", e);
          });
          return (
            <ChatItem
              key={index}
              userId={item.userId}
              userName={temp ? temp.nickName : "(알 수 없음)"}
              setProfileModal={setProfileModal}
              setProfileUserId={setProfileUserId}
              imgurl={temp ? temp.profileImage : undefined}
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
        <ProfileModal
          userId={profileUserId}
          onClose={() => {
            setProfileModal(false);
          }}
        />
      )}
      {errorModal && (
        <Modal
          onClose={() => {
            setErrorModal(false);
          }}
        >
          <Modal.Title text="아직 지원하지 않는 서비스입니다." />
        </Modal>
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
  padding-bottom: 3.89rem;
`;

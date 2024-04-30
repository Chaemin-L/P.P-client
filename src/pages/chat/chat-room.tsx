import { Stomp, CompatClient } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { ChatRoomData, ChatRoomSubMessage } from "./type";

import { ChatMakeRoom } from "@/api/types/chat-type";
import { ChatAppBar } from "@/components/chat/chat-app-bar";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatItem } from "@/components/chat/chat-item";
import { BottomSheet } from "@/components/common/bottom-sheet";
import { Modal } from "@/components/common/modal";
import { ProfileModal } from "@/components/common/profile-modal";
import { Report } from "@/components/report/report";
import { Transfer } from "@/components/transfer/transfer";
import { useChatDataSetting } from "@/hooks/chat/useChatDataSetting";
import { UseSendMessages } from "@/hooks/queries/useSendMessages";
import { transferState } from "@/recoil/atoms/transfer-state";
import { FormatDateString } from "@/utils/format-date-string";

export const ChatRoom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as ChatRoomData;

  const [transfer, setTransfer] = useRecoilState(transferState);
  const [newRoomMsgs, setNewRoomMsgs] = useState<ChatRoomSubMessage[]>([]);

  const roomMsgs = useChatDataSetting(state);

  const [appBarHeight, setAppBarHeight] = useState(0);
  const [appBerVisibility, setAppBarVisibility] = useState(true);
  const chatListRef = useRef<HTMLDivElement | null>(null);

  const [isBottomSheetOpened, setIsBottomSheetOpened] = useState(false);
  const [isTransfer, setIsTransfer] = useState(false);
  const [isReport, setIsReport] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);

  const [profileUserId, setProfileUserId] = useState<number>(0);

  const client = useRef<CompatClient | null>(null);
  const { mutate: sendMsg } = UseSendMessages();
  const tempId = localStorage.getItem("userId");
  const myId = tempId === null ? "" : tempId;

  const connectHandler = () => {
    const socket = new WebSocket(
      `${process.env.REACT_APP_CHAT_WS_BASE_URL}:${process.env.REACT_APP_CHAT_API_PORT}/ws/init`,
    );
    client.current = Stomp.over(socket);
    client.current.connect({}, () => {
      client.current?.subscribe(`/sub/room/${state.roomId}`, (message) => {
        const temp = JSON.parse(message.body) as ChatRoomSubMessage;
        setNewRoomMsgs((prevHistory) => {
          return prevHistory ? [...prevHistory, temp] : [];
        });
        console.log("newMessage:", message.body);
      });
    });
  };

  useEffect(() => {
    connectHandler();
  }, []);

  const scrollToBottom = () => {
    if (chatListRef.current !== null)
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
  };

  useEffect(() => {
    scrollToBottom();
  }, [newRoomMsgs]);

  const sendHandler = (inputValue: string) => {
    if (client.current && client.current.connected) {
      const temp = {
        type: "CHAT",
        roomIdx: state.roomId,
        message: inputValue,
        userId: myId,
        createdAt: FormatDateString(new Date()),
      };
      client.current.send(
        `/chat/room/${state.roomId}/message`,
        {},
        JSON.stringify(temp),
      );
    }
  };

  const handleSendMessage = (inputValue: string) => {
    sendHandler(inputValue);
    sendMsg({ roomId: state.roomId, message: inputValue });
  };

  return (
    <PageContainer>
      {appBerVisibility && (
        <ChatAppBar
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
          memberCount={state.memberCount}
          creatorId={state.creatorId}
        />
      )}
      <ChatList
        ref={chatListRef}
        style={{
          paddingTop: appBerVisibility ? `${appBarHeight + 10}px` : "10px",
        }}
      >
        {roomMsgs?.map((item, index) => {
          return (
            <ChatItem
              key={index}
              userId={item.senderInfo.userId}
              userName={item.senderInfo.nickName}
              setProfileModal={setProfileModal}
              setProfileUserId={setProfileUserId}
              imgurl={item.senderInfo.profileImage}
            >
              {item.message.replace(/^"(.*)"$/, "$1")}
            </ChatItem>
          );
        })}
        {newRoomMsgs?.map((item, index) => {
          const temp = transfer.users.find((e) => {
            if (e.userId === Number(item.userId)) return e;
          });
          return (
            <ChatItem
              key={index}
              userId={
                temp
                  ? Number(item.userId)
                  : item.userId === myId
                    ? Number(myId)
                    : -2
              }
              userName={temp ? temp.nickName : "(알 수 없음)"}
              setProfileModal={setProfileModal}
              setProfileUserId={setProfileUserId}
              imgurl={temp ? temp.profileImage : undefined}
            >
              {item.message.replace(/^"(.*)"$/, "$1")}
            </ChatItem>
          );
        })}
      </ChatList>
      <ChatInput onFocus={setAppBarVisibility} onClick={handleSendMessage} />
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
          <Modal.Title text="아직 지원하지 않는 \n 서비스입니다." />
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

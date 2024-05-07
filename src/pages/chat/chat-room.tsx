import { Stomp, CompatClient } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { ChatRoomData, ChatRoomSubMessage } from "./type";

import { ApplicantListBottomSheet } from "@/components/apply/applicant-list-bottom-sheet";
import { ChatAppBar } from "@/components/chat/chat-app-bar";
import { ChatAppBarBlock } from "@/components/chat/chat-app-bar-block";
import { ChatEntryExit } from "@/components/chat/chat-entry-exit";
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

  const [transfer] = useRecoilState(transferState);
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
  const [transferErrorModal, setTransferErrorModal] = useState(false);

  const [profileUserId, setProfileUserId] = useState<number>(0);
  const [isApplySheet, setIsApplySheet] = useState(false);
  const [applyLength, setApplyLength] = useState(0);

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
      });
    });
  };

  useEffect(() => {
    scrollToBottom();
    setNewRoomMsgs([]);
  }, [roomMsgs]);

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

  const refreshPage = () => {
    navigate(`/chat/detail`, {
      state: {
        roomId: state.roomId,
        postId: state.postId,
        memberCount: applyLength + 1,
        creatorId: state.creatorId,
        deletedPost: state.deletedPost,
        blockedRoom: state.blockedRoom,
      },
      replace: true,
    });
  };

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
      {appBerVisibility && !state.blockedRoom && !state.deletedPost && (
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
          creatorId={state.creatorId}
          onClickApply={() => {
            setIsBottomSheetOpened(true);
            setIsApplySheet(true);
          }}
          memberCount={state.memberCount}
          setTransferErrorModal={() => {
            setTransferErrorModal(true);
          }}
        />
      )}
      {(state.blockedRoom || state.deletedPost) && (
        <ChatAppBarBlock
          setAppBarHeight={setAppBarHeight}
          isDelted={state.deletedPost}
          isBlocked={state.blockedRoom}
        />
      )}
      <ChatList
        ref={chatListRef}
        style={{
          paddingTop: appBerVisibility ? `${appBarHeight + 10}px` : "10px",
        }}
      >
        {roomMsgs?.map((item, index) => {
          if (item.senderInfo !== null) {
            return (
              <ChatItem
                key={index}
                userId={item.senderInfo.deleted ? -2 : item.senderInfo.userId}
                userName={
                  item.senderInfo.deleted
                    ? "(알 수 없음)"
                    : item.senderInfo.nickName
                }
                setProfileModal={setProfileModal}
                setProfileUserId={setProfileUserId}
                imgurl={
                  item.senderInfo.deleted
                    ? undefined
                    : item.senderInfo.profileImage
                }
              >
                {item.message.replace(/^"(.*)"$/, "$1")}
              </ChatItem>
            );
          } else if (item.type === "JOIN" || item.type === "LEAVE") {
            return <ChatEntryExit key={index} msg={item.message} />;
          }
        })}
        {newRoomMsgs?.map((item, index) => {
          const temp = transfer.users.find((e) => {
            if (e.userId === Number(item.userId)) return e;
          });
          if (item.type === "CHAT") {
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
          } else {
            return <ChatEntryExit key={index} msg={item.message} />;
          }
        })}
      </ChatList>
      <ChatInput
        onFocus={setAppBarVisibility}
        onClick={handleSendMessage}
        blockedRoom={state.blockedRoom}
      />
      {!state.deletedPost && !state.blockedRoom && (
        <BottomSheet
          style={{ height: window.innerHeight > 720 ? "81%" : "90%" }}
          isOpened={isBottomSheetOpened}
          onChangeIsOpened={() => {
            setIsBottomSheetOpened(false);
            setIsReport(false);
            setIsTransfer(false);
            setIsApplySheet(false);
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
              postId={state.postId.toString()}
              onSuccessReport={() => {
                setIsBottomSheetOpened(false);
                setIsReport(false);
                setReportModal(true);
              }}
              creatorId={state.creatorId}
            />
          )}
          {isApplySheet && (
            <ApplicantListBottomSheet
              postId={state.postId.toString()}
              chatId={state.roomId}
              onFinishApply={() => {
                setIsApplySheet(false);
                setIsBottomSheetOpened(false);
              }}
              isApplyChange={() => {
                refreshPage();
              }}
              setApplyLength={setApplyLength}
            />
          )}
        </BottomSheet>
      )}
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
      {transferErrorModal && (
        <Modal
          onClose={() => {
            setTransferErrorModal(false);
          }}
        >
          <Modal.Title text="채팅방에 소속된 유저가 없어 \n 송금할 수 없습니다." />
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

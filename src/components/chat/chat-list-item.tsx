import { useNavigate } from "react-router";
import { styled } from "styled-components";

import { ChatRoomItemType } from "./type";

import { colorTheme } from "@/style/color-theme";

export const ChatListItem = (props: ChatRoomItemType) => {
  const navigate = useNavigate();

  const HandlerEnterRoom = () => {
    navigate(`/chat/detail`, {
      state: {
        roomId: props.roomId,
        postId: props.postId,
        memberCount: props.memberCount,
      },
    });
  };
  return (
    <ItemContainer onClick={HandlerEnterRoom}>
      <RowDiv>
        {props.postStatus === "RECRUITING" ? (
          <StateDiv>진행중</StateDiv>
        ) : (
          <StateFinishDiv>진행완료</StateFinishDiv>
        )}
        <LeftColumnDiv>
          <TitleText>{props.postTitle}</TitleText>
          <ItemText style={{ color: "#828282" }}>{props.chatMsg}</ItemText>
        </LeftColumnDiv>
      </RowDiv>
      <RightColumnDiv>
        <NewMsgNum
          style={{ visibility: props.msgNum !== 0 ? "visible" : "hidden" }}
        >
          {props.msgNum}
        </NewMsgNum>
        <ItemText style={{ color: "#d9d9d9" }}>{props.time}</ItemText>
      </RightColumnDiv>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  width: 100%;
  padding: 1.11rem 7.95% 1.11rem 6.92%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #d9d9d9;
  align-items: center;
`;

const RowDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const StateDiv = styled.div`
  height: 3rem;
  width: 3.56rem;
  background-color: ${colorTheme.orange400};
  color: #ffffff;
  text-align: center;
  font-size: 0.72rem;
  border-radius: 1.22rem;
  line-height: 3rem;
`;

const StateFinishDiv = styled.div`
  height: 3rem;
  width: 3.56rem;
  background-color: #ffffff;
  color: ${colorTheme.orange400};
  text-align: center;
  font-size: 0.72rem;
  border-radius: 0.5rem;
  border: 1px solid ${colorTheme.orange400};
  line-height: 3rem;
`;

const LeftColumnDiv = styled.div`
  display: flex;
  height: 2.7rem;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 0 0 4.61%;
  gap: 0.33rem;
`;

const TitleText = styled.span`
  font-size: 1rem;
  font-weight: bold;
`;

const NewMsgNum = styled.span`
  font-size: 0.56rem;
  text-align: center;
  padding: 0.17rem;
  width: 100%;
  border-radius: 0.5rem;
  background-color: ${colorTheme.orange400};
  color: #ffffff;
`;

const ItemText = styled.span`
  font-size: 0.56rem;
`;

const RightColumnDiv = styled.div`
  display: flex;
  height: 2.7rem;
  flex-direction: column;
  align-items: flex-end;
  padding: 0 0 0 4.61%;
  gap: 0.33rem;
  width: 20%;
`;

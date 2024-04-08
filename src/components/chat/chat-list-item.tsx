import { useNavigate } from "react-router";
import { styled } from "styled-components";

import { ChatRoomItemType } from "./type";

import { colorTheme } from "@/style/color-theme";

export const ChatListItem = (props: ChatRoomItemType) => {
  const navigate = useNavigate();

  const HandlerEnterRoom = () => {
    navigate(`/chat/${props.roomIdx}`);
  };
  return (
    <ItemContainer onClick={HandlerEnterRoom}>
      <RowDiv>
        {props.transferState ? (
          <StateFinishDiv>진행완료</StateFinishDiv>
        ) : (
          <StateDiv>진행중</StateDiv>
        )}
        <LeftColumnDiv>
          <TitleText>{props.name}</TitleText>
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
  padding: 20px 7.95% 20px 6.92%;
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
  height: 54px;
  width: 60px;
  background-color: ${colorTheme.orange400};
  color: #ffffff;
  text-align: center;
  font-size: 13px;
  border-radius: 22px;
  line-height: 54px;
`;

const StateFinishDiv = styled.div`
  height: 54px;
  width: 60px;
  background-color: #ffffff;
  color: ${colorTheme.orange400};
  text-align: center;
  font-size: 13px;
  border-radius: 9px;
  border: 1px solid ${colorTheme.orange400};
  line-height: 54px;
`;

const LeftColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0 0 0 4.61%;
  gap: 6px;
`;

const TitleText = styled.span`
  font-size: 18px;
`;

const NewMsgNum = styled.span`
  font-size: 10px;
  text-align: center;
  padding: 3px;
  width: 100%;
  border-radius: 9px;
  background-color: ${colorTheme.orange400};
  color: #ffffff;
`;

const ItemText = styled.span`
  font-size: 10px;
`;

const RightColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 0 0 0 4.61%;
  gap: 6px;
  width: 20%;
`;

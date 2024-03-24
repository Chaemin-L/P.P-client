import { useNavigate } from "react-router";
import { styled } from "styled-components";

import { ChatRoomItemType } from "./type";

export const ChatListItem = ({
  name,
  time,
  chatMsg,
  roomIdx,
}: ChatRoomItemType) => {
  const navigate = useNavigate();

  const HandlerEnterRoom = () => {
    navigate(`/chat/${roomIdx}`);
  };
  return (
    <ItemContainer onClick={HandlerEnterRoom}>
      <div>
        <StateDiv>모집현황</StateDiv>
        <LeftColumnDiv>
          <Text>{name}</Text>
          <Text>{chatMsg}</Text>
        </LeftColumnDiv>
      </div>
      <RightColumnDiv>
        <Text>{time}</Text>
        <Text>댓글 수</Text>
      </RightColumnDiv>
    </ItemContainer>
  );
};

const ItemContainer = styled.div`
  width: 100%;
  padding: 3.01% 7.95% 3.01% 6.92%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px;
  border-color: #d9d9d9;
`;

const StateDiv = styled.div`
  height: 6.78%;
  width: 16.41%;
  line-height: 6.78%;
  background-color: #d9d9d9;
  color: #ffffff;
  text-align: center;
  font-size: 13px;
`;

const LeftColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 0 0 4.61%;
  gap: 1%;
`;

const Text = styled.text`
  font-size: 10px;
`;

const RightColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  margin: 0 0 0 4.61%;
  gap: 1%;
`;

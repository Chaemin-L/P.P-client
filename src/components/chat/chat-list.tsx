import { styled } from "styled-components";

import { ChatListItem } from "./chat-list-item";
import { ChatRoomItemType } from "./type";

export const ChatList = (chatList: ChatRoomItemType[]) => {
  return (
    <ScrollContainer>
      {chatList.map((item, index) => (
        <ChatListItem
          key={index}
          name={item.name}
          chatMsg={item.chatMsg}
          time={item.time}
          roomIdx={item.roomIdx}
        />
      ))}
    </ScrollContainer>
  );
};

const ScrollContainer = styled.div`
  overflow: auto;
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;

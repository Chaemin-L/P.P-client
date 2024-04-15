import { styled } from "styled-components";

import { ChatListItem } from "./chat-list-item";
import { ChatRoomItemType } from "./type";

export const ChatList = ({ chatList }: { chatList: ChatRoomItemType[] }) => {
  return (
    <ScrollContainer>
      {chatList.map((item, index) => (
        <ChatListItem key={index} {...item} />
      ))}
    </ScrollContainer>
  );
};

const ScrollContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;

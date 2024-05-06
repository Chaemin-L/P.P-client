import { styled } from "styled-components";

import { ChatListItem } from "./chat-list-item";
import { ChatRoomItemType } from "./type";

import { ChatListItemType } from "@/api/types/chat-type";

export const ChatList = ({ chatList }: { chatList: ChatListItemType[] }) => {
  return (
    <ScrollContainer>
      {chatList.map((item, index) => {
        const tempItem: ChatRoomItemType = {
          roomId: item.roomId,
          postId: item.postId,
          memberCount: item.memberCount,
          postTitle: item.title,
          postStatus: item.status,
          time: "",
          chatMsg: "",
          msgNum: 0,
        };
        return <ChatListItem key={index} {...tempItem} />;
      })}
    </ScrollContainer>
  );
};

const ScrollContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;

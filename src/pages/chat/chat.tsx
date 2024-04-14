import { useEffect, useState } from "react";
import { styled } from "styled-components";

// import { tempChatList } from "./dummy";

import { ChatList } from "@/components/chat/chat-list";
import { AppBar } from "@/components/common/app-bar";
import { useGetChatList } from "@/hooks/queries/useGetChatList";

export const Chat = () => {
  const [appBarHeight, setAppBarHeight] = useState(0);
  const { data: chatList } = useGetChatList();

  useEffect(() => {
    const element = document.getElementById("AppBar");
    if (element) {
      const height = element.offsetHeight;
      setAppBarHeight(height);
    }
  }, [setAppBarHeight]);

  return (
    <Wrapper style={{ paddingTop: `${appBarHeight}px` }}>
      <AppBar id="AppBar" isFixed={true}>
        <PageText>채팅</PageText>
      </AppBar>
      {chatList && <ChatList chatList={chatList} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
  overflow: auto;
  height: 100%;
`;

const PageText = styled.div`
  color: black;
  font-size: 1.78rem;
  width: 100%;
  padding: 1.39rem 7.95% 0.56rem;
  border-bottom: 1px solid #d9d9d9;
  font-weight: 500;
`;

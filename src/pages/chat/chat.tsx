import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { tempChatList } from "./dummy";

import { ChatList } from "@/components/chat/chat-list";
import { AppBar } from "@/components/common/app-bar";

export const Chat = () => {
  const [appBarHeight, setAppBarHeight] = useState(0);

  useEffect(() => {
    const element = document.getElementById("AppBar");
    if (element) {
      const height = element.offsetHeight;
      setAppBarHeight(height);
    }
  }, [setAppBarHeight]);

  return (
    <Wrapper>
      <AppBar id="AppBar" isFixed={true}>
        <PageText>채팅</PageText>
      </AppBar>
      <div style={{ height: `${appBarHeight}px` }}></div>
      <ChatList chatList={tempChatList} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;

const PageText = styled.div`
  color: black;
  font-size: 32px;
  width: 100%;
  padding: 25px 7.95% 10px;
  border-bottom: 1px solid #d9d9d9;
`;

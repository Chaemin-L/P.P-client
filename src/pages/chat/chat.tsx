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
        <AppBar.AppBarNavigate style={{ padding: "20px 20px 8px 21px" }}>
          <AppBar.BackButton />
        </AppBar.AppBarNavigate>
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
  color: #d9d9d9;
  font-size: 32px;
  width: 100%;
  padding: 10px 7.95%;
  border-bottom: 1px solid #d9d9d9;
`;

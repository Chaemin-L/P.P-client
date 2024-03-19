import { styled } from "styled-components";

import { MyChatType } from "./type";

export const MyChat = ({ children }: MyChatType) => {
  return (
    <ChatContainer>
      <ChatBox>
        <ChatText>{children}</ChatText>
      </ChatBox>
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  width: 100%;
  margin-bottom: 3.14%;
  height: auto;
`;

const ChatBox = styled.div`
  float: right;
  max-width: 62.1%;
  height: auto;
  width: auto;
  padding: 3.6% 4.7%;
  background-color: #d9d9d9;
  margin-right: 5.8%;
`;

const ChatText = styled.text`
  color: #ffffff;
`;

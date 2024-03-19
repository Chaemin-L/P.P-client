import styled from "styled-components";

import { OtherChatType } from "./type";

export const OtherChat = ({ children, userId, imgurl }: OtherChatType) => {
  return (
    <Container>
      <ProfileContainer>
        <ProfileImg />
      </ProfileContainer>
      <ChatBox>
        <ChatText>{children}</ChatText>
      </ChatBox>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  margin-bottom: 3.14%;
  height: auto;
`;

const ProfileContainer = styled.div`
  width: 12.37%;
  padding-top: 12.37%;
  margin-left: 8.15%;
  margin-right: 4.75%;
  border-radius: 10px;
  background-color: #d9d9d9;
  display: flex;
  flex-direction: row;
`;

const ProfileImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: over;
`;

const ChatBox = styled.div`
  float: right;
  max-width: 62.1%;
  height: auto;
  width: auto;
  padding: 3.6% 4.7%;
  background-color: #d9d9d9;
`;

const ChatText = styled.text`
  color: #ffffff;
`;

import { styled } from "styled-components";

import { ChatItemType } from "./type";

export const ChatItem = ({
  children,
  userId,
  imgurl,
  userName,
}: ChatItemType) => {
  // const myName = localStorage.getItem("userName")
  //   ? localStorage.getItem("userName")
  //   : "김철수";

  const myName = "김철수";

  return (
    <Container
      style={{
        justifyContent: userName === myName ? "flex-end" : "flex-start",
      }}
    >
      {userName === myName ? (
        <></>
      ) : (
        <ProfileContainer>{imgurl ? <ProfileImg /> : <></>}</ProfileContainer>
      )}
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
  display: flex;
  flex-direction: row;
`;

const ProfileContainer = styled.div`
  width: 48px;
  height: 40px;
  margin-left: 7.15%;
  margin-right: 3.75%;
  border-radius: 10px;
  background-color: #d9d9d9;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
`;

const ChatBox = styled.div`
  max-width: 62.1%;
  height: auto;
  width: auto;
  padding: 3.6% 4.7%;
  background-color: #d9d9d9;
  margin-right: 6%;
  border-radius: 5px;
`;

const ChatText = styled.div`
  color: #ffffff;
  font-size: 18px;
  word-break: break-all;
`;

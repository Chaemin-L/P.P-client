import { styled } from "styled-components";

import { ChatItemType } from "./type";

import { colorTheme } from "@/style/color-theme";

export const ChatItem = ({
  children,
  userId,
  imgurl,
  userName,
  setProfileModal,
  setProfileUserId,
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
        <ProfileContainer
          onClick={() => {
            setProfileUserId(userId);
            setProfileModal(true);
          }}
        >
          {imgurl ? <ProfileImg /> : <></>}
        </ProfileContainer>
      )}
      <ChatColumnBox
        style={{
          alignItems: userName === myName ? "flex-end" : "flex-start",
        }}
      >
        <ChatBox
          style={{
            backgroundColor:
              userName === myName ? colorTheme.blue100 : colorTheme.blue300,
          }}
        >
          <ChatText>{children}</ChatText>
        </ChatBox>
      </ChatColumnBox>
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
  width: 2.22rem;
  height: 2.22rem;
  margin-left: 7.15%;
  margin-right: 4%;
  border-radius: 0.83rem;
  background-color: #d9d9d9;
`;

const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
`;

const ChatBox = styled.div`
  max-width: 100%;
  height: auto;
  width: auto;
  padding: 3.6% 4.7%;
  margin-right: 6%;
  border-radius: 0.28rem;
`;

const ChatText = styled.div`
  color: black;
  font-size: 0.83rem;
  word-break: break-all;
`;

const ChatColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 62.1%;
`;

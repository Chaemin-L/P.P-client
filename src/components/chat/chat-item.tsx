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
  const myId = localStorage.getItem("userId")
    ? localStorage.getItem("userId")
    : "-1";

  // console.log("myId: ", myId);
  // console.log("userId: ", { userId, imgurl, userName });

  return (
    <Container
      style={{
        justifyContent:
          Number(userName) === Number(myId) ? "flex-end" : "flex-start",
      }}
    >
      {userName === myId ? (
        <></>
      ) : (
        <ProfileContainer
          onClick={() => {
            setProfileUserId(Number(userId));
            setProfileModal(true);
          }}
        >
          {imgurl ? <ProfileImg /> : <></>}
        </ProfileContainer>
      )}
      <ChatColumnBox
        style={{
          alignItems: userName === myId ? "flex-end" : "flex-start",
        }}
      >
        <ChatBox
          style={{
            backgroundColor:
              userName === myId ? colorTheme.blue100 : colorTheme.blue300,
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

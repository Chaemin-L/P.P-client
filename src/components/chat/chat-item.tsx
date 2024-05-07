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
  const tempId = localStorage.getItem("userId");
  const myId = tempId ? Number(tempId) : -1;

  return (
    <Container
      style={{
        justifyContent: userId === myId ? "flex-end" : "flex-start",
      }}
    >
      {userId !== myId && (
        <ProfileImg
          onClick={() => {
            if (userId !== -2) {
              setProfileUserId(Number(userId));
              setProfileModal(true);
            }
          }}
          src={imgurl}
        ></ProfileImg>
      )}
      <ChatColumnBox
        style={{
          alignItems: userId === myId ? "flex-end" : "flex-start",
        }}
      >
        {userId !== myId && <NameDiv>{userName}</NameDiv>}
        <ChatBox
          style={{
            backgroundColor:
              userId === myId ? colorTheme.blue100 : colorTheme.blue300,
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

const ProfileImg = styled.img`
  width: 2.22rem;
  height: 2.22rem;
  margin: 0.6rem 4% 0 7.15%;
  border-radius: 0.83rem;
  background-color: #d9d9d9;
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
  font-size: 1.2rem;
  word-break: break-all;
`;

const ChatColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 62.1%;
  gap: 0.4rem;
`;

const NameDiv = styled.div`
  font-size: 0.83rem;
  color: #707379;
`;

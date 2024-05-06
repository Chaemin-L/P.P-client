import { useState } from "react";
import { styled } from "styled-components";

import { InputType } from "./type";

import ChatSendSVG from "@/assets/icons/chat-send.svg";
import { colorTheme } from "@/style/color-theme";

export const ChatInput = ({ onFocus, onClick, blockedRoom }: InputType) => {
  const [inputValue, setIsValue] = useState("");
  return (
    <Container>
      <InputContainer
        value={
          blockedRoom
            ? "게시글 작성자가 탈퇴하여 채팅을 할 수 없습니다."
            : inputValue
        }
        onChange={(e) => setIsValue(e.target.value)}
        onFocus={() => onFocus(false)}
        onBlur={() => onFocus(true)}
        readOnly={blockedRoom}
      />
      <ChatButton
        onClick={() => {
          if (inputValue !== "") {
            onClick(inputValue);
            setIsValue("");
          }
        }}
      >
        <ButtonImg src={ChatSendSVG} />
        <ButtonDiv>전송하기</ButtonDiv>
      </ChatButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  position: fixed;
  bottom: 0;
  font-size: 1rem;
  height: 3.33rem;
  padding: 0 0.44rem 0.44rem;
  gap: 1.5%;
  background-color: white;
`;

const InputContainer = styled.textarea`
  width: 100%;
  padding: 0.56rem;
  font-size: 1.22rem;
  border: none;
  border-radius: 0.67rem;
  background-color: ${colorTheme.blue100};
`;

const ChatButton = styled.button`
  width: 4.9rem;
  height: 100%;
  background-color: ${colorTheme.blue700};
  border: none;
  padding: 0.56rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.22rem;
  border-radius: 0.67rem;
`;

const ButtonImg = styled.img`
  width: 0.83rem;
  height: 0.83rem;
`;

const ButtonDiv = styled.div`
  font-size: 0.72rem;
  width: 100%;
  color: white;
`;

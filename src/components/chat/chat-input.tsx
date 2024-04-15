import { useState } from "react";
import { styled } from "styled-components";

import { InputType } from "./type";

export const ChatInput = ({ onFocus, onClick }: InputType) => {
  const [inputValue, setIsValue] = useState("");
  return (
    <Container>
      <ChatButton></ChatButton>
      <InputContainer
        value={inputValue}
        onChange={(e) => setIsValue(e.target.value)}
        onFocus={() => onFocus(false)}
        onBlur={() => onFocus(true)}
      />
      <ChatButton
        onClick={() => {
          if (inputValue !== "") {
            onClick(inputValue);
            setIsValue("");
          }
        }}
      >
        보내기
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
  height: 3.3rem;
`;

const InputContainer = styled.textarea`
  width: calc(100% - 6.66rem);
  padding: 0.56rem;
  font-size: 1.22rem;
  border: none;
`;

const ChatButton = styled.button`
  width: 3.33rem;
  height: 100%;
  background-color: #e6e6e6;
  border: none;
`;

import { useEffect, useRef } from "react";
import { styled } from "styled-components";

import { InputType } from "./type";

export const ChatInput = ({ value, onChange, onFocus }: InputType) => {
  // const inputRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   if (inputRef.current) {
  //     const height = inputRef.current.offsetHeight;
  //     setHeight(height);
  //   }
  // }, [setHeight]);

  return (
    <Container>
      <ChatButton></ChatButton>
      <InputContainer
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e);
        }}
        onFocus={() => onFocus(false)}
        onBlur={() => onFocus(true)}
      />
      <ChatButton>보내기</ChatButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  position: fixed;
  bottom: 0;
  font-size: 18px;
  height: 60px;
`;

const InputContainer = styled.input`
  width: calc(100% - 120px);
  padding: 10px;
  font-size: 22px;
`;

const ChatButton = styled.button`
  width: 60px;
  height: 100%;
  background-color: #e6e6e6;
  border: none;
`;

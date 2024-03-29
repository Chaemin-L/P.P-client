import { useEffect, useRef } from "react";
import { styled } from "styled-components";

import { InputType } from "./type";

export const ChatInput = ({ value, onChange, setHeight }: InputType) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const height = inputRef.current.offsetHeight;
      setHeight(height);
    }
  }, [setHeight]);

  return (
    <Container ref={inputRef}>
      <InputContainer
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e);
        }}
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
`;

const InputContainer = styled.input`
  width: 70%;
`;

const ChatButton = styled.button`
  width: 30%;
`;

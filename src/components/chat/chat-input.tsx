import { styled } from "styled-components";

import { InputType } from "./type";

export const ChatInput = ({ value, onChange, children }: InputType) => {
  return (
    <Container>
      <InputContainer />
      <ChatButton>보내기</ChatButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const InputContainer = styled.input`
  width: 70%;
`;

const ChatButton = styled.button`
  width: 30%;
`;

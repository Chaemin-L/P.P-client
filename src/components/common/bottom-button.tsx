import React from "react";
import { styled } from "styled-components";

type BottomButtonProps = {
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export const BottomButton = ({ children }: BottomButtonProps) => {
  return (
    <ButtonWrapper>
      <StyledButton>{children}</StyledButton>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  width: 100%;
  margin: auto;
  position: absolute;
  padding: 0 16px 20px;
  bottom: 0;
  left: 0;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 8px 10px;
  border-radius: 50px;
  border: 0;
  background-color: #dddddd;
  font-size: 24px;
`;

import React from "react";
import { styled } from "styled-components";

type ButtonProps = {
  isRounded?: boolean;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;

type BottomFixedProps = {
  alignDirection?: "row" | "column";
  children: React.ReactNode;
};

const Button = ({ isRounded = true, ...props }: ButtonProps) => {
  return (
    <StyledButton $isRounded={isRounded} {...props}>
      {props.children}
    </StyledButton>
  );
};

export const BottomFixed = ({
  alignDirection = "row",
  children,
}: BottomFixedProps) => {
  return (
    <BottomFixedContainer $alignDirection={alignDirection}>
      {children}
    </BottomFixedContainer>
  );
};

BottomFixed.Button = Button;

const BottomFixedContainer = styled.div<{ $alignDirection: string }>`
  display: flex;
  flex-direction: ${({ $alignDirection }) => $alignDirection};
  gap: 11px;
  width: 100%;
  margin: auto;
  position: absolute;
  padding: 0 16px 20px;
  bottom: 0;
  left: 0;
`;

const StyledButton = styled.button<{ $isRounded: boolean }>`
  width: 100%;
  padding: 12px;

  background-color: black;
  ${({ $isRounded }) =>
    $isRounded ? "border-radius: 50px;" : "background-color: #aaaaaa"};
  border: 0;
  color: white;
  font-size: 24px;
`;

import React, { PropsWithChildren } from "react";
import { styled } from "styled-components";

type ButtonProps = {
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;

type BottomFixedProps = {
  align?: "row" | "column";
  children: React.ReactNode;
};

const Button = (props: ButtonProps) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};

export const BottomFixed = ({ align = "row", children }: BottomFixedProps) => {
  return <BottomFixedContainer align={align}>{children}</BottomFixedContainer>;
};

BottomFixed.Button = Button;

const BottomFixedContainer = styled.div<{ align: string }>`
  display: flex;
  flex-direction: ${({ align }) => align};
  gap: 11px;
  width: 100%;
  margin: auto;
  position: absolute;
  padding: 0 16px 20px;
  bottom: 0;
  left: 0;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 50px;
  border: 0;
  background-color: black;
  color: white;
  font-size: 24px;
`;

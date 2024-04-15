import React from "react";
import { styled } from "styled-components";

import { colorTheme } from "@/style/color-theme";

type ButtonProps = {
  rounded?: boolean;
  color?: "blue" | "orange";
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;

type BottomFixedProps = {
  alignDirection?: "row" | "column";
  children: React.ReactNode;
};

const Button = ({ rounded = true, color = "blue", ...props }: ButtonProps) => {
  return (
    <StyledButton $rounded={rounded} color={color} {...props}>
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

const StyledButton = styled.button<{
  $rounded: boolean;
  color: "blue" | "orange";
}>`
  width: 100%;
  padding: 12px;
  background-color: ${({ color }) =>
    color === "blue" ? `${colorTheme.blue900}` : `${colorTheme.orange400}`};

  ${({ $rounded }) => $rounded && "border-radius: 50px;"}
  border: 0;
  color: white;
  font-size: 1.3rem;
`;

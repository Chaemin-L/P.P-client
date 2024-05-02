import React, { ButtonHTMLAttributes } from "react";
import { styled } from "styled-components";

import { colorTheme } from "@/style/color-theme";

type ButtonProps = {
  rounded?: boolean;
  color?: "blue" | "orange" | "white";
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  rounded = false,
  color = "blue",
  ...props
}: ButtonProps) => {
  return (
    <StyledButton $rounded={rounded} color={color} {...props}>
      {props.children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{
  $rounded: boolean;
  color: "blue" | "orange" | "white";
}>`
  padding: 15px 30px;
  border-radius: 20px;
  border: 1px solid transparent;
  color: white;
  font-size: 1rem;

  ${({ $rounded }) => $rounded && "border-radius: 40px;"}

  ${({ color }) =>
    color === "blue"
      ? `
      background-color: ${colorTheme.blue900};
      &:active{
        background-color: #fff;
        color: ${colorTheme.blue900};
        border: 1px solid ${colorTheme.blue900};
      }
    `
      : color === "orange"
        ? `background-color: ${colorTheme.orange400};
        &:active{
          background-color: #fff;
          color: ${colorTheme.orange400}; 
          border: 1px solid ${colorTheme.orange400};
        }`
        : `background-color: #f5f5f5; color: ${colorTheme.blue900}`};
`;

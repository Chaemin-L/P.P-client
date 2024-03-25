import React from "react";
import { css, styled } from "styled-components";

type ButtonProps = {
  primary?: boolean;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export const Button = ({ primary = false, ...props }: ButtonProps) => {
  return (
    <StyledButton primary={primary} {...props}>
      {props.children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ primary: boolean }>`
  width: fit-content;
  padding: 15px 30px;
  border-radius: 40px;
  border: 0;
  background-color: black;
  color: white;
  font-size: 18px;
  ${({ primary }) =>
    !primary &&
    css`
      background-color: white;
      box-shadow: 0 0 1px rgba(0, 0, 0, 0);
      color: black;
    `}
`;

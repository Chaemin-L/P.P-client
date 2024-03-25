import React from "react";
import { css, styled } from "styled-components";

type ButtonProps = {
  isSmall?: boolean;
  primary?: boolean;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export const Button = ({
  isSmall = false,
  primary = false,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton primary={primary} isSmall={isSmall} {...props}>
      {props.children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ primary: boolean; isSmall: boolean }>`
  width: fit-content;
  padding: 15px 30px;
  border-radius: 21px;
  border: 0;
  background-color: black;
  color: white;
  font-size: 16px;
  ${({ primary }) =>
    !primary &&
    css`
      background-color: white;
      box-shadow: 0 0 1px rgba(0, 0, 0, 0);
      color: black;
    `}
  ${({ isSmall }) =>
    isSmall &&
    css`
      font-size: 18px;
      border-radius: 40px;
    `}
`;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [currentUrl, setCurrentUrl] = useState<string[]>([]);

  useEffect(() => {
    setCurrentUrl(getCurrentPage(location.pathname));
  }, [location.pathname]);

  function getCurrentPage(url: string): string[] {
    return url.split("/");
  }

  return (
    <BottomFixedContainer
      $alignDirection={alignDirection}
      style={{
        bottom:
          currentUrl[1] == "post" ||
          (currentUrl[1] == "chat" && !currentUrl[2]) ||
          currentUrl[1] == "mypage"
            ? "4rem"
            : "2.2rem",
      }}
    >
      {children}
    </BottomFixedContainer>
  );
};

BottomFixed.Button = Button;

const BottomFixedContainer = styled.div<{ $alignDirection: string }>`
  display: flex;
  position: fixed;
  flex-direction: ${({ $alignDirection }) => $alignDirection};
  gap: 11px;
  left: 0;
  right: 0;
`;

const StyledButton = styled.button<{
  $rounded: boolean;
  color: "blue" | "orange";
}>`
  position: relative;
  width: calc(100% - 3.2rem);
  max-width: calc(480px - 3.2rem);
  margin: auto;
  padding: 12px;
  ${({ color }) =>
    color === "blue"
      ? `background-color: ${colorTheme.blue900};
    &:active{
      background-color: #fff;
      color: ${colorTheme.blue900};
      border: 1px solid ${colorTheme.blue900};
    }
    `
      : `background-color: ${colorTheme.orange400}; 
      &:active{
      background-color: #fff;
      color: ${colorTheme.orange400};
      outline: 1px solid ${colorTheme.orange400};
    }`};

  ${({ $rounded }) => $rounded && "border-radius: 50px;"}
  border: 0;
  color: white;
  font-size: 1.3rem;
`;

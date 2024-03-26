import React from "react";
import { styled } from "styled-components";

type BottomButtonProps = {
  warpperStyle?: React.CSSProperties;
  children: React.ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type">;

export const BottomButton = (props: BottomButtonProps) => {
  const { warpperStyle, ...restProps } = props;
  const mergedStyle = { ...warpperStyle };
  return (
    <ButtonWrapper style={mergedStyle}>
      <StyledButton {...restProps}>{props.children}</StyledButton>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  width: 100%;
  margin: auto;
  position: absolute;
  padding: 0 16px 20px;
  bottom: 0;
  /* left: 0;
  right: 0; */
  background-color: #ffffff;
`;

const StyledButton = styled.button`
  width: 100%;
  padding: 8px 10px;
  border-radius: 50px;
  border: 0;
  background-color: #dddddd;
  font-size: 24px;
`;

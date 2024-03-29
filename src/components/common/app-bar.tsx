import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import { AppBarProps } from "./type";

import backImgWhite from "@/assets/images/back-img-white.png";
import backImg from "@/assets/images/back-img.png";

export const AppBar = ({
  isFixed = false,
  isBorderExist,
  isColorMode,
  ...props
}: AppBarProps) => {
  const Wrapper = isFixed ? AppBarFixedWrapper : AppBarWrapper;

  return (
    <Wrapper
      {...props}
      style={{
        borderBottom: isBorderExist ? "8px solid #d9d9d9" : "none",
        backgroundColor: isColorMode ? "#d9d9d9" : "#ffffff",
        color: isColorMode ? "#ffffff" : "#d9d9d9",
      }}
    >
      {props.children}
    </Wrapper>
  );
};

const AppBarNavigate = (props: AppBarProps) => {
  return <NavigateWrapper {...props}>{props.children}</NavigateWrapper>;
};

const BackButton = ({ isColorMode, ...props }: AppBarProps) => {
  const { onClick, ...restProps } = props;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
    if (onClick) onClick;
  };
  return (
    <StyledButton onClick={handleClick} {...restProps}>
      <BackButtonImg src={isColorMode ? backImgWhite : backImg} />
    </StyledButton>
  );
};

const HeaderText = ({ isBigSizeText, ...props }: AppBarProps) => {
  return (
    <AppBarText
      style={{ fontSize: isBigSizeText ? "25px" : "15px" }}
      {...props}
    >
      {props.children}
    </AppBarText>
  );
};

const AppBarFixedWrapper = styled.div`
  width: 100%;
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
`;

const AppBarWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const NavigateWrapper = styled.div`
  width: 100%;
  padding: 27px 21px 18px 21px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StyledButton = styled.button`
  width: 30px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border: 0;
  background-color: transparent;
`;

const AppBarText = styled.span`
  width: 100%;
  text-align: center;
`;

const BackButtonImg = styled.img`
  width: 10px;
  height: 10px;
`;

AppBar.AppBarNavigate = AppBarNavigate;
AppBar.BackButton = BackButton;
AppBar.HeaderText = HeaderText;

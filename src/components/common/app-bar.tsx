import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import { AppBarProps, HamburgerProps } from "./type";

import backImgWhite from "@/assets/images/back-img-white.png";
import backImg from "@/assets/images/back-img.png";
import hamburgerMenuBlack from "@/assets/images/hamburger-menu-black.png";
import hamburgerMenuWhite from "@/assets/images/hamburger-menu-white.png";
import { colorTheme } from "@/style/color-theme";

export const AppBar = ({
  isFixed = false,
  isBorderExist = false,
  isColorMode = false,
  ...props
}: AppBarProps) => {
  const Wrapper = isFixed ? AppBarFixedWrapper : AppBarWrapper;

  return (
    <Wrapper
      {...props}
      style={{
        borderBottom: isBorderExist ? "8px solid 1" : "none",
        backgroundColor: isColorMode ? colorTheme.blue900 : "#ffffff",
        color: isColorMode ? "#ffffff" : colorTheme.blue900,
      }}
    >
      {props.children}
    </Wrapper>
  );
};

const AppBarNavigate = (props: AppBarProps) => {
  return <NavigateWrapper {...props}>{props.children}</NavigateWrapper>;
};

const BackButton = ({ isColorMode = false, ...props }: AppBarProps) => {
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

const HeaderText = ({ isBigSizeText = false, ...props }: AppBarProps) => {
  return (
    <AppBarText
      style={{ fontSize: isBigSizeText ? "25px" : "15px" }}
      {...props}
    >
      {props.children}
    </AppBarText>
  );
};

const HamburgerButton = ({ isColorMode = false, ...props }: HamburgerProps) => {
  return (
    <StyledButton {...props}>
      <HamburgerButtonImg
        src={isColorMode ? hamburgerMenuWhite : hamburgerMenuBlack}
      />
    </StyledButton>
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

const HamburgerButtonImg = styled.img`
  width: 14px;
  height: 16px;
`;

AppBar.AppBarNavigate = AppBarNavigate;
AppBar.BackButton = BackButton;
AppBar.HeaderText = HeaderText;
AppBar.HamburgerButton = HamburgerButton;

import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import { TopBarProps } from "./type";

import backImg from "@/assets/images/back-img.png";

export const TopBar = ({ onClick, children }: TopBarProps) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
    if (onClick) onClick();
  };

  return (
    <TopBarContainer>
      <BackButton onClick={handleGoBack}>
        <BackButtonImg src={backImg} />
      </BackButton>
      <TopBarText>{children}</TopBarText>
    </TopBarContainer>
  );
};

const TopBarContainer = styled.div`
  width: 100%;
  padding: 27px 21px 18px 21px;
  bottom-border: 8px;
  font-size: 15px;
  color: #d9d9d9;
  display: flex;
  flex-direction: row;
`;

const BackButton = styled.button`
  width: 30px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border: 0;
  background-color: #ffffff;
`;

const BackButtonImg = styled.img`
  width: 10px;
  height: 10px;
`;

const TopBarText = styled.span`
  width: 100%;
  text-align: center;
  padding: 10px 30px 0px 30px;
`;

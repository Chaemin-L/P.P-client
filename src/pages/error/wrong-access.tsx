import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import { colorTheme } from "@/style/color-theme";

export const WrongAccessPage = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Header>잘못된 접근입니다</Header>
      <GoHome onClick={() => navigate("/")}>홈으로 이동하기</GoHome>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50%;
  background-color: ${colorTheme.blue900};
`;

const Header = styled.h2`
  font-size: 2rem;
  color: white;
`;

const GoHome = styled.button`
  padding: 10px;
  border: 0;
  border-radius: 10px;
  background-color: white;
  box-shadow: 1px 1px 10px 0 #000;
  font-size: 1.2rem;
`;

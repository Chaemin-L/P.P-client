import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import LeftEmSVG from "@/assets/images/left-em.svg";
import RightEmSVG from "@/assets/images/right-em.svg";
import { BottomFixed } from "@/components/common/bottom-fixed";
import { Header } from "@/components/profile/header";

export const DonePage = () => {
  const navigate = useNavigate();
  return (
    <ContentLayout>
      <Header text="프로필을\n만들었어요!" />
      <EmphasisWrapper>
        <img src={LeftEmSVG} />
        <img src={RightEmSVG} />
      </EmphasisWrapper>
      <BottomFixed>
        <BottomFixed.Button color="orange" onClick={() => navigate("/")}>
          홈화면으로 가기
        </BottomFixed.Button>
      </BottomFixed>
    </ContentLayout>
  );
};

const ContentLayout = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;

const EmphasisWrapper = styled.div`
  width: 205px;
  position: absolute;
  display: flex;
  justify-content: space-between;
  left: 50%;
  transform: translateX(-50%);
`;

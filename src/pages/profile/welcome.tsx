import { styled } from "styled-components";

import WelcomeSVG from "@/assets/images/welcome.svg";
import { BottomFixed } from "@/components/common/bottom-fixed";
import { Description } from "@/components/profile/description";
import { Header } from "@/components/profile/header";

type WelcomePageProps = {
  nextStep: () => void;
};

export const WelcomePage = ({ nextStep }: WelcomePageProps) => {
  return (
    <ContentLayout>
      <Header text="만나서 반갑습니다" />
      <img width={218} src={WelcomeSVG} />
      <Description text="정릉이음\n지금 시작해볼까요?" />
      <BottomFixed>
        <BottomFixed.Button color="orange" onClick={() => nextStep()}>
          시작하기
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

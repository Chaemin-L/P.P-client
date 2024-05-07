import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import SplashBackSVG from "@/assets/images/splash-back.svg";
import SplashHandSVG from "@/assets/images/splash-hand.svg";
import { BottomFixed } from "@/components/common/bottom-fixed";
import { Description } from "@/components/profile/description";
import { Header } from "@/components/profile/header";

export const WelcomePage = () => {
  const navigate = useNavigate();
  return (
    <ContentLayout>
      <Header text="만나서 반갑습니다" />
      <BackgroundImg img={SplashBackSVG}>
        <HandImg
          src={SplashHandSVG}
          animate={{
            rotate: [0, -10, 10, -10, 10, 0],
            transition: { duration: 2, repeat: Infinity },
          }}
        />
      </BackgroundImg>
      <Description text="정릉이음\n지금 시작해볼까요?" />
      <BottomFixed>
        <BottomFixed.Button color="orange" onClick={() => navigate("/profile")}>
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

const BackgroundImg = styled.div<{ img: string }>`
  width: 12.11rem;
  height: 7.56rem;
  position: relative;
  background-image: url(${({ img }) => img});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

const HandImg = styled(motion.img)`
  width: 6.167rem;
  height: 6.06rem;
  position: absolute;
  left: 27%;
  bottom: -16%;
`;

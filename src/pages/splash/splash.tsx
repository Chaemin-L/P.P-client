import { async } from "@firebase/util";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import SplashBackSVG from "@/assets/images/splash-back.svg";
import SplashHandSVG from "@/assets/images/splash-hand.svg";
import SplashLogoSVG from "@/assets/images/splash-logo.svg";
import { colorTheme } from "@/style/color-theme";
import getRefreshToken from "@/utils/token";

export const Splash = () => {
  let path = "/login";
  const navigate = useNavigate();

  const verifyTokens = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (accessToken !== undefined && refreshToken !== undefined) {
      try {
        const data = await getRefreshToken();
        if (data) {
          localStorage.setItem("role", data.role);
          if (data.role !== "ROLE_USER") {
            path = "/signup";
            console.log("splash::", path);
            navigate(path, { replace: true });
          } else {
            path = "/post";
            navigate(path, { replace: true });
          }
        }
      } catch (error) {
        console.log(error);
        path = "/login";
      }
    } else {
      path = "/login";
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      verifyTokens().catch((err) => console.log(err));
      navigate(path, { replace: true });
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Wrapper>
      {/* <BackgroundImg img={SplashBackSVG}>
        <HandImg
          src={SplashHandSVG}
          animate={{
            rotate: [0, -10, 10, -10, 10, 0],
            transition: { duration: 2, repeat: Infinity },
          }}
        />
      </BackgroundImg> */}
      <LogoImg
        src={SplashLogoSVG}
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1.0 }}
        transition={{ duration: 1 }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colorTheme.blue100};
`;

const LogoImg = styled(motion.img)`
  width: 15.06rem;
  height: 3.38rem;
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

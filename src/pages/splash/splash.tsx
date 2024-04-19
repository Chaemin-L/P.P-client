import { motion } from "framer-motion";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

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

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import ChatDarkSVG from "@/assets/icons/chat-dark.svg";
import ChatOrangeSVG from "@/assets/icons/chat-orange.svg";
import MypageDarkSVG from "@/assets/icons/mypage-dark.svg";
import MypageOrangeSVG from "@/assets/icons/mypage-orange.svg";
import PostDark from "@/assets/icons/post-dark.svg";
import PostOrange from "@/assets/icons/post-orange.svg";
import { colorTheme } from "@/style/color-theme";

export const BottomNavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentUrl, setCurrentUrl] = useState<string>("");

  function getCurrentPage(url: string): string {
    const path = url.split("/")[1];
    return path;
  }

  useEffect(() => {
    setCurrentUrl(getCurrentPage(location.pathname));
  }, [location.pathname]);

  return (
    <Wrapper>
      <NavigateButton
        onClick={() => {
          navigate("/mypage", { replace: true });
        }}
      >
        <img src={currentUrl == "mypage" ? MypageOrangeSVG : MypageDarkSVG} />
        <ButtonText
          style={{
            color: currentUrl == "mypage" ? "#f17547" : "#828282",
            fontWeight: currentUrl == "mypage" ? "bold" : "normal",
          }}
        >
          내정보
        </ButtonText>
      </NavigateButton>
      <NavigateButton
        onClick={() => {
          navigate("/post", { replace: true });
        }}
      >
        <img src={currentUrl == "post" ? PostOrange : PostDark} />
        <ButtonText
          style={{
            color: currentUrl == "post" ? "#f17547" : "#828282",
            fontWeight: currentUrl == "post" ? "bold" : "normal",
          }}
        >
          전체 게시물
        </ButtonText>
      </NavigateButton>
      <NavigateButton
        onClick={() => {
          navigate("/chat", { replace: true });
        }}
      >
        <img src={currentUrl == "chat" ? ChatOrangeSVG : ChatDarkSVG} />
        <ButtonText
          style={{
            color: currentUrl == "chat" ? "#f17547" : "#828282",
            fontWeight: currentUrl == "chat" ? "bold" : "normal",
          }}
        >
          채팅
        </ButtonText>
      </NavigateButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 3.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  background-color: ${colorTheme.blue100};
`;

const NavigateButton = styled.button`
  width: 33.33%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  border: none;
  gap: 0.22rem;
  padding-top: 7px;
  height: 100%;
`;

const ButtonText = styled.span`
  width: 100%;
  font-size: 1rem;
  color: ${colorTheme.shade};
`;

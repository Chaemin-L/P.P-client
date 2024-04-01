import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

export const BottomNavigationBar = () => {
  const navigate = useNavigate();
  const [currentUrl, setCurrentUrl] = useState<string>("");

  function getCurrentPage(url: string): string {
    const path = url.split("/")[1];
    return path;
  }

  useEffect(() => {
    setCurrentUrl(getCurrentPage(window.location.pathname));
  }, []);

  return (
    <Wrapper id="BottomNavigationBar">
      <NavigateButton
        onClick={() => {
          navigate("/post");
        }}
        style={{
          backgroundColor: currentUrl === "post" ? "#000000" : "#ffffff",
        }}
      >
        <ButtonImg />
        <ButtonText>게시글</ButtonText>
      </NavigateButton>
      <NavigateButton
        onClick={() => {
          navigate("/posting/1");
        }}
        style={{
          backgroundColor: currentUrl === "posting" ? "#000000" : "#ffffff",
        }}
      >
        <ButtonImg />
        <ButtonText>글쓰기</ButtonText>
      </NavigateButton>
      <NavigateButton
        onClick={() => {
          navigate("/chat");
        }}
        style={{
          backgroundColor: currentUrl === "chat" ? "#000000" : "#ffffff",
        }}
      >
        <ButtonImg />
        <ButtonText>채팅</ButtonText>
      </NavigateButton>
      <NavigateButton
        onClick={() => {
          navigate("/profile");
        }}
        style={{
          backgroundColor: currentUrl === "profile" ? "#000000" : "#ffffff",
        }}
      >
        <ButtonImg />
        <ButtonText>내정보</ButtonText>
      </NavigateButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
`;

const NavigateButton = styled.button`
  width: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-color: #d9d9d9;
`;

const ButtonText = styled.span`
  width: 100%;
  font-size: 18px;
  color: #d9d9d9;
`;

const ButtonImg = styled.img`
  width: 80%;
  height: 100%;
`;

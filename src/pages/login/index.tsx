import { styled } from "styled-components";

import { ReactComponent as LoginIcon } from "@/assets/icons/login-icon.svg";
import { GoogleButton } from "@/components/login/google-button";
import { KakaoButton } from "@/components/login/kakao-button";
import { colorTheme } from "@/style/color-theme";

export const LoginPage = () => {
  return (
    <Layout>
      <Content>
        <Header>간편하게 로그인</Header>
        <LoginIcon width="5rem" />
        <ButtonContainer>
          <GoogleButton />
          <KakaoButton />
        </ButtonContainer>
      </Content>
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  max-width: 480px;
  margin: auto;
  font-size: 0.88rem;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.78rem;
`;

const Header = styled.h2`
  font-size: 1.67rem;
  color: ${colorTheme.orange400};
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

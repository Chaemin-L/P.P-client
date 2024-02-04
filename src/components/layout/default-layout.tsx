import { styled } from "styled-components";

interface DefaultLayoutProps {
  appbar?: React.ReactNode;
  children?: React.ReactNode;
}

const DefaultAppbar = () => (
  <StyledDefaultAppbar>기본 앱바</StyledDefaultAppbar>
);

export const DefaultLayout = ({
  appbar = <DefaultAppbar />,
  children,
}: DefaultLayoutProps) => {
  return (
    <Wrapper>
      {appbar ?? <DefaultAppbar />}
      <StyledDefaultLayout>{children}</StyledDefaultLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100dvw;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  max-width: 480px;
  margin: auto;
  font-size: 16px;
  background-color: #f4f4f4;
`;

const StyledDefaultAppbar = styled.div`
  width: 100%;
  height: 64px;
  padding: 10px 16px;
  background-color: gray;
`;

const StyledDefaultLayout = styled.div`
  position: relative;
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 20px 16px;
`;

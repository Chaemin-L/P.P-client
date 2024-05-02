import { styled } from "styled-components";

interface DefaultLayoutProps {
  appbar?: React.ReactNode;
  scrollbar?: boolean;
  children?: React.ReactNode;
}

const DefaultAppbar = () => (
  <StyledDefaultAppbar>기본 앱바</StyledDefaultAppbar>
);

export const DefaultLayout = ({
  appbar = <DefaultAppbar />,
  scrollbar = false,
  children,
}: DefaultLayoutProps) => {
  return (
    <Wrapper>
      {appbar ?? <DefaultAppbar />}
      <StyledDefaultLayout $scrollbar={scrollbar}>
        {children}
      </StyledDefaultLayout>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  max-width: 480px;
  margin: auto;
  font-size: 0.88rem;
  background-color: #ffffff;
`;

const StyledDefaultAppbar = styled.div`
  width: 100%;
  height: 64px;
  padding: 10px 16px;
  background-color: gray;
`;

const StyledDefaultLayout = styled.div<{ $scrollbar: boolean }>`
  position: relative;
  flex: 1;
  width: 100%;
  height: 100%;
  ${({ $scrollbar }) => $scrollbar && "overflow-y: auto;overflow-x:hidden"}
`;

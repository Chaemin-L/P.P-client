import { motion } from "framer-motion";
import { styled } from "styled-components";

import { BottomSheetProps } from "./type";

export const BottomSheet = ({ children }: BottomSheetProps) => {
  return (
    <Wrapper>
      <HeaderContainer>
        <Header>
          <HeaderXButton>
            <HeaderXImg>X</HeaderXImg>
          </HeaderXButton>
        </Header>
      </HeaderContainer>
      <ContentContainer>{children}</ContentContainer>
    </Wrapper>
  );
};

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  height: auto;
  max-height: 81%;
  /* background-color: rgb(0, 0, 0, 1); */
  width: 100%;
`;

const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Header = styled.div`
  position: relative;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: #ffffff;
  box-shadow: 0 -8px 10px rgb(0, 0, 0, 0.25);
`;

const HeaderXButton = styled.button`
  position: absolute;
  width: 16.4%;
  padding-top: 16.4%;
  border-radius: 10%;
  background-color: #ffffff;
  border: 0;
  box-shadow: -1px 0 13px rgb(0, 0, 0, 0.09);
  right: -3%;
`;

const HeaderXImg = styled.text`
  position: absolute;
  width: 100%;
  line-height: 100%;
  text-align: center;
`;

const ContentContainer = styled.div`
  background-color: #ffffff;
  align-items: center;
`;

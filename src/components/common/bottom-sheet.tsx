import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";

import { BottomSheetProps } from "./type";

import CloseBlueDarkSVG from "@/assets/icons/close-blue-dark.svg";

export const BottomSheet = ({
  onChangeIsOpened,
  isOpened,
  style,
  ...props
}: BottomSheetProps) => {
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const [height, SetHeight] = useState(0);

  const variants = {
    opened: { top: `${window.innerHeight - height}px` },
    closed: { top: "100%" },
  };

  useEffect(() => {
    if (sheetRef.current) {
      SetHeight(sheetRef.current.offsetHeight);
    }
  }, [props]);

  // useEffect(() => {
  //   const handleClickOutside = (e: TouchEvent) => {
  //     if (
  //       sheetRef.current &&
  //       e.target instanceof Node &&
  //       !sheetRef.current.contains(e.target) &&
  //       isOpened
  //     ) {
  //       onChangeIsOpened();
  //     }
  //   };
  //   document.addEventListener("touchend", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("touchend", handleClickOutside);
  //   };
  // }, [isOpened, sheetRef]);

  return (
    <Background style={{ visibility: isOpened ? "visible" : "hidden" }}>
      <Wrapper
        ref={sheetRef}
        variants={variants}
        animate={isOpened ? "opened" : "closed"}
        initial={false}
        style={{
          visibility: isOpened ? "visible" : "hidden",
          transition: "visibility 1s",
          ...style,
        }}
      >
        <HeaderContainer>
          <HeaderXButton onClick={() => onChangeIsOpened()}>
            <HeaderXImg src={CloseBlueDarkSVG} />
          </HeaderXButton>
          <EmptyBox></EmptyBox>
          <Header></Header>
        </HeaderContainer>
        <ContentContainer>{props.children}</ContentContainer>
      </Wrapper>
    </Background>
  );
};

const Background = styled.div`
  position: absolute;
  background-color: rgb(0, 0, 0, 0.25);
  z-index: 70;
  height: 100%;
  width: 100%;
  top: 0;
`;

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 71;
  top: 0;
  left: 0;
  right: 0;
  height: auto;
  max-height: 90%;
  width: 100%;
  transition: transform 150ms ease-out;
`;

const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
`;

const EmptyBox = styled.div`
  width: 100%;
  height: 1.39rem;
`;

const Header = styled.div`
  border-top-left-radius: 1.67rem;
  border-top-right-radius: 1.67rem;
  background-color: #ffffff;
  box-shadow: 0 -0.44rem 0.56rem rgb(0, 0, 0, 0.25);
  width: 100%;
  height: 2.22rem;
`;

const HeaderXButton = styled.button`
  position: absolute;
  width: 16.4%;
  padding-top: 16.4%;
  border-radius: 50%;
  background-color: #ffffff;
  border: 0;
  box-shadow: -1px 0 0.72rem rgb(0, 0, 0, 0.09);
  right: 3%;
  z-index: 73;
`;

const HeaderXImg = styled.img`
  position: absolute;
  width: 80%;
  height: 80%;
  text-align: center;
  top: 10%;
  right: 10%;
`;

const ContentContainer = styled.div`
  background-color: #ffffff;
  align-items: center;
  height: 100%;
  width: 100%;
  z-index: 72;
  border-top: 0.17rem solid #ffffff;
  box-shadow: 0 -1px 1px #ffffff;
`;

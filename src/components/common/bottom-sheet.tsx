import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";

import { BottomSheetProps } from "./type";

export const BottomSheet = ({
  children,
  onChangeIsOpened,
  isOpened,
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
  }, [children]);

  useEffect(() => {
    const handleClickOutside = (e: TouchEvent) => {
      if (
        sheetRef.current &&
        e.target instanceof Node &&
        !sheetRef.current.contains(e.target) &&
        isOpened
      ) {
        onChangeIsOpened(false);
      }
    };
    document.addEventListener("touchend", handleClickOutside);
    return () => {
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, [isOpened, sheetRef]);

  return (
    // <Background style={{ visibility: isOpened ? "visible" : "hidden" }}>
    <Wrapper
      ref={sheetRef}
      variants={variants}
      animate={isOpened ? "opened" : "closed"}
      initial={false}
      style={{
        visibility: isOpened ? "visible" : "hidden",
        transition: "visibility 1s",
      }}
    >
      <HeaderContainer>
        <HeaderXButton onClick={() => onChangeIsOpened(!isOpened)}>
          <HeaderText>x</HeaderText>
        </HeaderXButton>
        <EmptyBox></EmptyBox>
        <Header></Header>
      </HeaderContainer>
      <ContentContainer>{children}</ContentContainer>
    </Wrapper>
  );
};

// const Background = styled.div`
//   position: absolute;
//   background-color: rgb(0, 0, 0, 0.25);
//   z-index: 9996;
//   height: 100%;
//   width: 100%;
// `;

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 9997;
  top: 0;
  left: 0;
  right: 0;
  height: auto;
  max-height: 81%;
  width: 100%;
  transition: transform 150ms ease-out;
`;

const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
`;

const EmptyBox = styled.div`
  width: 100%;
  height: 25px;
`;

const Header = styled.div`
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  background-color: #ffffff;
  box-shadow: 0 -8px 10px rgb(0, 0, 0, 0.25);
  width: 100%;
  height: 40px;
`;

const HeaderXButton = styled.button`
  position: absolute;
  width: 16.4%;
  padding-top: 16.4%;
  border-radius: 50%;
  background-color: #ffffff;
  border: 0;
  box-shadow: -1px 0 13px rgb(0, 0, 0, 0.09);
  right: 3%;
  z-index: 9999;
`;

const HeaderText = styled.text`
  position: absolute;
  width: 100%;
  line-height: 100%;
  text-align: center;
  right: 3%;
  top: 40%;
`;

const ContentContainer = styled.div`
  background-color: #ffffff;
  align-items: center;
  height: auto;
  width: 100%;
  z-index: 9998;
  border-top: 3px solid #ffffff;
  box-shadow: 0 -1px 1px #ffffff;
`;

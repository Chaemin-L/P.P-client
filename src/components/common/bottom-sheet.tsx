import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";

import { BottomSheetProps } from "./type";

import xButtonImg from "@/assets/images/x-button-img.png";

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

  useEffect(() => {
    const handleClickOutside = (e: TouchEvent) => {
      if (
        sheetRef.current &&
        e.target instanceof Node &&
        !sheetRef.current.contains(e.target) &&
        isOpened
      ) {
        onChangeIsOpened();
      }
    };
    document.addEventListener("touchend", handleClickOutside);
    return () => {
      document.removeEventListener("touchend", handleClickOutside);
    };
  }, [isOpened, sheetRef]);

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
            <HeaderXImg src={xButtonImg} />
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
  z-index: 9996;
  height: 100%;
  width: 100%;
  top: 0;
`;

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: fixed;
  z-index: 9997;
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

const HeaderXImg = styled.img`
  position: absolute;
  width: 80%;
  height: 80%;
  text-align: center;
  top: 10%;
  right: 10%;
  /* right: 3%;
  top: 40%; */
`;

const ContentContainer = styled.div`
  background-color: #ffffff;
  align-items: center;
  height: 100%;
  width: 100%;
  z-index: 9998;
  border-top: 3px solid #ffffff;
  box-shadow: 0 -1px 1px #ffffff;
`;

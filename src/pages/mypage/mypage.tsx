import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { AppBar } from "@/components/common/app-bar";
import { MypageList } from "@/components/mypage/mypage-list";
import { MypageListProfile } from "@/components/mypage/mypage-list-profile";
import { MypageToggleSwitch } from "@/components/mypage/mypage-toggle-switch";
import { MypageUpButton } from "@/components/mypage/mypage-up-button";
import { colorTheme } from "@/style/color-theme";

export const Mypage = () => {
  const [isLeftSelected, setIsLeftSelected] = useState(true);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const [miniButtonVisible, setMiniButtonVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (wrapperRef.current) {
        const isScrollingDown = wrapperRef.current.scrollTop > 600;
        setMiniButtonVisible(isScrollingDown);
      }
    };

    wrapperRef.current?.addEventListener("scroll", handleScroll);
    return () => {
      wrapperRef.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMiniButton = () => {
    if (wrapperRef.current) {
      wrapperRef.current.scrollTop = 0;
    }
  };

  return (
    <Wrapper ref={wrapperRef}>
      <AppBar style={{ backgroundColor: colorTheme.blue900 }}>
        <AppBar.AppBarNavigate
          style={{
            paddingBottom: "1.06rem",
            paddingTop: "2.944rem",
            paddingLeft: "1.94rem",
          }}
        >
          <AppBar.HeaderText
            style={{
              fontSize: "1.78rem",
              color: "#ffffff",
              textAlign: "start",
            }}
          >
            마이페이지
          </AppBar.HeaderText>
        </AppBar.AppBarNavigate>
        <MypageListProfile />
        <div
          style={{
            width: "100%",
            backgroundColor: colorTheme.blue100,
          }}
        >
          <MypageToggleSwitch
            firstText="내게시물"
            secondText="신청내역"
            isLeftSelected={isLeftSelected}
            onChangeSelected={setIsLeftSelected}
          />
        </div>
      </AppBar>
      <MypageList type={isLeftSelected ? "postlist" : "apply"} />
      {miniButtonVisible && <MypageUpButton onHandler={handleMiniButton} />}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

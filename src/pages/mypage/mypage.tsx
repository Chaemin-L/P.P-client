import { useState } from "react";
import styled from "styled-components";

import { AppBar } from "@/components/common/app-bar";
import { MypageList } from "@/components/mypage/mypage-list";
import { MypageToggleSwitch } from "@/components/mypage/mypage-toggle-switch";
import { colorTheme } from "@/style/color-theme";

export const Mypage = () => {
  const [isLeftSelected, setIsLeftSelected] = useState(true);

  return (
    <Wrapper>
      <AppBar style={{ backgroundColor: colorTheme.blue100 }}>
        <AppBar.AppBarNavigate
          style={{ paddingBottom: "19px", paddingTop: "25px" }}
        >
          <AppBar.HeaderText style={{ fontSize: "25px" }}>
            마이페이지
          </AppBar.HeaderText>
        </AppBar.AppBarNavigate>
        <div style={{ width: "100%", backgroundColor: colorTheme.blue100 }}>
          <MypageToggleSwitch
            firstText="내게시물"
            secondText="신청내역"
            isLeftSelected={isLeftSelected}
            onChangeSelected={setIsLeftSelected}
          />
        </div>
      </AppBar>
      <MypageList type={isLeftSelected ? "postlist" : "apply"} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

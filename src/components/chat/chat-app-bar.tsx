import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { ChatAppBarType } from "./type";

import { AppBar } from "@/components/common/app-bar";
import { Button } from "@/components/common/button";
import { lastTransferState } from "@/recoil/atoms/last-transfet-state";

export const ChatAppBar = ({
  name,
  onClickReport,
  onClickTransfer,
  setAppBarHeight,
}: ChatAppBarType) => {
  const [lastTransfer, setLastTransfer] = useRecoilState(lastTransferState);

  useEffect(() => {
    const element = document.getElementById("AppBar");
    if (element) {
      const height = element.offsetHeight;
      setAppBarHeight(height);
    }
  }, [setAppBarHeight]);

  const isColorMode = !lastTransfer.transferState;

  return (
    <AppBar isFixed={true} isColorMode={isColorMode} id="AppBar">
      <AppBar.AppBarNavigate style={{ padding: "4% 21px" }}>
        <AppBar.BackButton isColorMode={isColorMode} />
        <AppBar.HeaderText>{name}</AppBar.HeaderText>
        <AppBar.HamburgerButton
          isColorMode={isColorMode}
          onClick={() => {
            onClickReport();
          }}
        />
      </AppBar.AppBarNavigate>
      <ColumnBox>
        {isColorMode && (
          <RowBox>
            <Button
              style={{ width: "100%", borderRadius: "30px", padding: "15px" }}
            >
              거래파기
            </Button>
            <Button
              style={{ width: "100%", borderRadius: "30px", padding: "15px" }}
            >
              게시물 보기
            </Button>
          </RowBox>
        )}
        <Button
          style={{
            width: "100%",
            fontSize: "24px",
            padding: "10px",
            borderRadius: "30px",
            background: isColorMode ? "#ffffff" : "#d9d9d9",
            marginTop: isColorMode ? "0" : "11px",
          }}
          onClick={onClickTransfer}
        >
          송금하기
        </Button>
      </ColumnBox>
    </AppBar>
  );
};

const ColumnBox = styled.div`
  width: 100%;
  padding: 0 33px 13px;
  display: flex;
  flex-direction: column;
  gap: 11px;
  background-color: #d9d9d9;
`;

const RowBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 8.3%;
`;

import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { ChatAppBarType } from "./type";

import { AppBar } from "@/components/common/app-bar";
import { Button } from "@/components/common/button";
import { lastTransferState } from "@/recoil/atoms/last-transfet-state";
import { colorTheme } from "@/style/color-theme";

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
      {isColorMode ? (
        <BeforeTransfer onClickTransfer={onClickTransfer} />
      ) : (
        <AfterTransfer />
      )}
    </AppBar>
  );
};

const ColumnBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 11px;
  background-color: white;
`;

const RowBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 8.3%;
  padding: 0 33px;
`;

const AfterTransferDiv = styled.div`
  width: 100%;
  font-size: 30px;
  padding: 10px;
  background: ${colorTheme.blue100};
  color: white;
  text-align: center;
  line-height: 50px;
`;

type BeforeTransferProps = {
  onClickTransfer: () => void;
};

const AfterTransfer = () => {
  return (
    <ColumnBox>
      <RowBox>
        <Button
          color="blue"
          style={{
            width: "100%",
            padding: "15px",
          }}
        >
          거래내역
        </Button>
        <Button
          color="blue"
          style={{
            width: "100%",
            padding: "15px",
          }}
        >
          게시물 보기
        </Button>
      </RowBox>
      <AfterTransferDiv>송금완료</AfterTransferDiv>
    </ColumnBox>
  );
};

const BeforeTransfer = ({ onClickTransfer }: BeforeTransferProps) => {
  return (
    <ColumnBox
      style={{ backgroundColor: colorTheme.blue900, paddingBottom: "13px" }}
    >
      <RowBox>
        <Button
          color="white"
          style={{
            width: "100%",
            padding: "15px",
          }}
        >
          거래파기
        </Button>
        <Button
          color="white"
          style={{
            width: "100%",
            padding: "15px",
          }}
        >
          게시물 보기
        </Button>
      </RowBox>
      <div style={{ padding: "0 33px" }}>
        <Button
          color="white"
          style={{
            width: "100%",
            fontSize: "24px",
            padding: "10px",
            borderRadius: "30px",
            marginTop: "0",
          }}
          onClick={onClickTransfer}
        >
          송금하기
        </Button>
      </div>
    </ColumnBox>
  );
};

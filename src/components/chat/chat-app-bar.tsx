import { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";

import { ChatAppBarType } from "./type";

import { AppBar } from "@/components/common/app-bar";
import { Button } from "@/components/common/button";

export const ChatAppBar = (props: ChatAppBarType) => {
  const { name, onClickTransfer, setAppBarHeight, ...restProps } = props;
  // const [height, setHeight] = useState(0);

  useEffect(() => {
    const element = document.getElementById("AppBar");
    if (element) {
      const height = element.offsetHeight;
      setAppBarHeight(height);
    }
  }, [setAppBarHeight]);

  return (
    <AppBar isFixed={true} isColorMode={true} id="AppBar">
      <AppBar.AppBarNavigate style={{ padding: "4% 21px" }}>
        <AppBar.BackButton isColorMode={true} />
        <AppBar.HeaderText>{name}</AppBar.HeaderText>
      </AppBar.AppBarNavigate>
      <ColumnBox>
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
        <Button
          style={{
            width: "100%",
            fontSize: "24px",
            padding: "10px",
            borderRadius: "30px",
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
`;

const RowBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 8.3%;
`;

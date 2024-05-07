import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { ChatAppBarBlockProps } from "./type";

import { AppBar } from "@/components/common/app-bar";
import { Button } from "@/components/common/button";
import { transferState } from "@/recoil/atoms/transfer-state";
import { colorTheme } from "@/style/color-theme";

export const ChatAppBarBlock = ({
  setAppBarHeight,
  isDelted,
  isBlocked,
}: ChatAppBarBlockProps) => {
  const navigate = useNavigate();
  const [transfer] = useRecoilState(transferState);

  useEffect(() => {
    const element = document.getElementById("AppBar");
    if (element) {
      const height = element.offsetHeight;
      setAppBarHeight(height);
    }
  }, [setAppBarHeight]);

  return (
    <AppBar isFixed={true} id="AppBar" isColorMode={isDelted}>
      <AppBar.AppBarNavigate style={{ padding: "4% 21px" }}>
        <AppBar.BackButton
          onClick={() => navigate("/chat", { replace: true })}
        />
        <AppBar.HeaderText>{transfer.title}</AppBar.HeaderText>
      </AppBar.AppBarNavigate>
      <ColumnBox>
        {isDelted && !isBlocked && (
          <Button
            color="white"
            onClick={() => {
              navigate(`/post/${transfer.postId}`);
            }}
            style={{ margin: "0 1.5rem 0.7rem 1.5rem" }}
          >
            게시물 보기
          </Button>
        )}
        <TextDiv>
          {isDelted && !isBlocked && "삭제된 게시글의 채팅방입니다."}
          {isBlocked && "작성자가 탈퇴한 채팅방입니다."}
        </TextDiv>
      </ColumnBox>
    </AppBar>
  );
};

const ColumnBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TextDiv = styled.div`
  display: flex;
  width: 100%;
  height: 3rem;
  font-size: 1.2rem;
  align-items: center;
  justify-content: center;
  background-color: ${colorTheme.blue300};
`;

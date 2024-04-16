import { useLocation, useNavigate } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import { styled } from "styled-components";

import { AppBar } from "@/components/common/app-bar";
import { BottomFixed } from "@/components/common/bottom-fixed";
import { PostingBoldText } from "@/components/posting/posting-bold-text";
import { postingState } from "@/recoil/atoms/posting-state";

export const Posting8 = () => {
  const location = useLocation();
  const state = location.state as { postId: number };
  const resetRecoil = useResetRecoilState(postingState);
  const navigate = useNavigate();

  return (
    <PageContainer>
      <AppBar>
        <AppBar.AppBarNavigate>
          <AppBar.BackButton
            onClick={() => {
              resetRecoil();
              localStorage.removeItem("postId");
              navigate("/post");
            }}
          />
        </AppBar.AppBarNavigate>
      </AppBar>
      <PostingBoldText style={{ marginTop: "50px" }}>
        게시물이
        <br />
        완성되었습니다!
      </PostingBoldText>
      <BottomFixed>
        <BottomFixed.Button
          color="orange"
          onClick={() => {
            resetRecoil();
            navigate(`/post/${state.postId}`);
          }}
        >
          게시물 보러가기
        </BottomFixed.Button>
      </BottomFixed>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;

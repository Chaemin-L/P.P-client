import { useNavigate } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import { styled } from "styled-components";

import { BottomButton } from "@/components/common/bottom-button";
import { TopBar } from "@/components/common/top-bar";
import { PostingBoldText } from "@/components/posting/posting-bold-text";
import { postingState } from "@/recoil/atoms/posting-state";

export const Posting8 = () => {
  const resetRecoil = useResetRecoilState(postingState);
  const navigate = useNavigate();

  // 뒤로가기 누르면 리스트로 가게
  return (
    <PageContainer>
      <TopBar
        onClick={() => {
          navigate("");
          resetRecoil();
        }}
      >
        {" "}
      </TopBar>
      <PostingBoldText style={{ marginTop: "50px" }}>
        게시물이
        <br />
        완성되었습니다!
      </PostingBoldText>
      <BottomButton
        onClick={() => {
          resetRecoil();
          navigate("/posting/8");
          // 게시글 상세페이지로 가게
        }}
      >
        게시물 보러가기
      </BottomButton>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;

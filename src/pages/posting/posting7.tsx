import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { BottomButton } from "@/components/common/bottom-button";
import { TopBar } from "@/components/common/top-bar";
import { PostingBoldText } from "@/components/posting/posting-bold-text";
import { PostingInput } from "@/components/posting/posting-input";
import { postingState } from "@/recoil/atoms/posting-state";

export const Posting7 = () => {
  const [posting, setPosting] = useRecoilState(postingState);
  const [contents, setContents] = useState(posting.contents);
  const navigate = useNavigate();

  const handleSave = () => {
    setPosting((prevPosting) => {
      const updatedPosting = { ...prevPosting, contents: contents };
      return updatedPosting;
    });
  };

  return (
    <PageContainer>
      <TopBar
        onClick={() => {
          handleSave();
        }}
      >
        1/10완료
      </TopBar>
      <PostingBoldText>활동 내용을 적어보세요</PostingBoldText>
      <PostingInput.InputContent
        value={contents}
        onChange={(e) => {
          setContents(e.target.value);
        }}
      />
      <BottomButton
        onClick={() => {
          handleSave();
          navigate("/posting/8");
        }}
      >
        게시물 만들기
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

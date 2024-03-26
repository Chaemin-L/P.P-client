import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { BottomButton } from "@/components/common/bottom-button";
import { TopBar } from "@/components/common/top-bar";
import { PostingBoldText } from "@/components/posting/posting-bold-text";
import { PostingInput } from "@/components/posting/posting-input";
import { postingState } from "@/recoil/atoms/posting-state";

export const Posting6 = () => {
  const [posting, setPosting] = useRecoilState(postingState);
  const [title, setTitle] = useState(posting.title);
  const navigate = useNavigate();

  const handleSave = () => {
    setPosting((prevPosting) => {
      const updatedPosting = { ...prevPosting, title: title };
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
      <PostingBoldText>활동 제목을 적어보세요</PostingBoldText>
      <PostingInput.InputTitle
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <BottomButton
        warpperStyle={{ width: "50%", left: 0, paddingRight: "8px" }}
        onClick={() => {
          handleSave();
          navigate(-1);
        }}
      >
        이전
      </BottomButton>
      <BottomButton
        warpperStyle={{ width: "50%", right: 0, paddingLeft: "8px" }}
        onClick={() => {
          handleSave();
          navigate("/posting/7");
        }}
      >
        다음
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

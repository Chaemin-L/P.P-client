import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { PostingAppBar } from "@/components/posting/posting-app-bar";
import { PostingBoldText } from "@/components/posting/posting-bold-text";
import { PostingInput } from "@/components/posting/posting-input";
import { postingState } from "@/recoil/atoms/posting-state";
import { colorTheme } from "@/style/color-theme";

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
      <PostingAppBar
        onClick={() => {
          handleSave();
        }}
      >
        6/7
      </PostingAppBar>
      <PostingBoldText>활동 제목을 적어보세요</PostingBoldText>
      <PostingInput.InputTitle
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setTitle(e.target.value);
        }}
      />
      <BottomFixed alignDirection="row">
        <BottomFixed.Button
          style={{ backgroundColor: colorTheme.blue900 }}
          onClick={() => {
            handleSave();
            navigate(-1);
          }}
        >
          이전
        </BottomFixed.Button>
        <BottomFixed.Button
          style={{ backgroundColor: colorTheme.blue900 }}
          onClick={() => {
            handleSave();
            navigate("/posting/7");
          }}
        >
          다음
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

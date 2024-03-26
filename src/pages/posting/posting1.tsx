import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { styled } from "styled-components";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { InputBox } from "@/components/common/Input-box";
import { TopBar } from "@/components/common/top-bar";
import { PostingBoldText } from "@/components/posting/posting-bold-text";
import { postingState } from "@/recoil/atoms/posting-state";

export const Posting1 = () => {
  const resetRecoil = useResetRecoilState(postingState);
  const [posting, setPosting] = useRecoilState(postingState);
  const [location, setLocation] = useState(posting.location);
  const navigate = useNavigate();

  const handleSave = () => {
    setPosting((prevPosting) => {
      const updatedPosting = { ...prevPosting, location: location };
      return updatedPosting;
    });
  };

  return (
    <PageContainer>
      <TopBar onClick={() => resetRecoil()}>1/10완료</TopBar>
      <PostingBoldText>위치를 입력해 주세요</PostingBoldText>
      <InputBox.InputMap
        value={location}
        onChange={(e) => {
          setLocation(e.target.value);
        }}
      />
      <BottomFixed>
        <BottomFixed.Button
          onClick={() => {
            handleSave();
            navigate("/posting/4");
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

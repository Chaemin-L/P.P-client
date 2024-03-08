import { useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { styled } from "styled-components";

import { BottomButton } from "@/components/common/bottom-button";
import { TopBar } from "@/components/common/top-bar";
import { PostingInput } from "@/components/posting/posting-input";
import { postingState } from "@/recoil/atoms/posting-state";

export const Posting2 = () => {
  const [posting, setPosting] = useRecoilState(postingState);
  const [location, setLocation] = useState(posting.location);

  return (
    <PageContainer>
      <TopBar>1/10완료</TopBar>
      <Text>위치를 입력해 주세요</Text>
      <PostingInput.InputMap value={location} onChange={setLocation} />
      <BottomButton
        onClick={() => {
          setPosting((prevPosting) => {
            const updatedPosting = { ...prevPosting, location: location };
            return updatedPosting;
          });
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
`;

const Text = styled.span`
  margin: 40px 0px 45px 0px;
  font-size: 30px;
  color: #a1a1a1;
`;

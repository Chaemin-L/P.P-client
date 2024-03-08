import { useState } from "react";
import { useRecoilState, useResetRecoilState } from "recoil";
import { styled } from "styled-components";

import { BottomButton } from "@/components/common/bottom-button";
import { SelectToggle } from "@/components/common/select-toggle";
import { TopBar } from "@/components/common/top-bar";
import { postingState } from "@/recoil/atoms/posting-state";

export const Posting1 = () => {
  const resetRecoil = useResetRecoilState(postingState);
  const [posting, setPosting] = useRecoilState(postingState);
  const [typeState, setTypeState] = useState(posting.activityType);

  return (
    <PageContainer>
      <TopBar onClick={resetRecoil}>1/10완료</TopBar>
      <Text>항목을 선택해주세요</Text>
      <Grid>
        {typeState.map((item, index) => (
          <SelectToggle.CheckTypeToggle
            key={index}
            state={item.state}
            onClick={() => {
              setTypeState((prevTypeState) => {
                const updatedTypeState = [...prevTypeState];
                updatedTypeState[index] = { ...item, state: !item.state };
                return updatedTypeState;
              });
            }}
          >
            {item.name}
          </SelectToggle.CheckTypeToggle>
        ))}
      </Grid>
      <BottomButton
        onClick={() => {
          setPosting((prevPosting) => {
            const updatedPosting = { ...prevPosting, activityType: typeState };
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 3.07%;
  width: 83.07%;
  margin: 0px 0px 40px 0px;
`;

const Text = styled.span`
  margin: 40px 0px 45px 0px;
  font-size: 30px;
  color: #a1a1a1;
`;

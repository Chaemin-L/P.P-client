import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState } from "recoil";
import { styled } from "styled-components";

import { BottomButton } from "@/components/common/bottom-button";
import { ToggleNotUse } from "@/components/common/toggle-notuse";
import { TopBar } from "@/components/common/top-bar";
import { postingState } from "@/recoil/atoms/posting-state";

const Posting1 = () => {
  const resetRecoil = useResetRecoilState(postingState);
  const [posting, setPosting] = useRecoilState(postingState);
  const [typeState, setTypeState] = useState(posting.activityType);
  const navigate = useNavigate();

  const handleSvae = () => {
    setPosting((prevPosting) => {
      const updatedPosting = { ...prevPosting, activityType: typeState };
      return updatedPosting;
    });
  };

  return (
    <PageContainer>
      <ScrollContainer>
        <TopBar onClick={resetRecoil}>1/10완료</TopBar>
        <Text>항목을 선택해주세요</Text>
        <Grid>
          {typeState.map((item, index) => (
            <ToggleNotUse.CheckTypeToggle
              key={index}
              state={item.state}
              onClick={() => {
                setTypeState((prevTypeState) => {
                  const updatedTypeState = prevTypeState.map(
                    (prevStateItem, idx) => {
                      if (idx === index) {
                        return {
                          ...prevStateItem,
                          state: !prevStateItem.state,
                        };
                      } else {
                        return { ...prevStateItem, state: false };
                      }
                    },
                  );
                  return updatedTypeState;
                });
              }}
            >
              {item.name}
            </ToggleNotUse.CheckTypeToggle>
          ))}
        </Grid>
      </ScrollContainer>
      <BottomButton
        onClick={() => {
          handleSvae();
          navigate("/posting/2");
          console.log("event!");
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
  height: 100%;
  align-items: center;
  flex-direction: column;
`;

const ScrollContainer = styled.div`
  overflow: auto;
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 3.07%;
  width: 83.07%;
  margin: 0px 0px 150px 0px;
`;

const Text = styled.span`
  margin: 40px 0px 45px 0px;
  font-size: 30px;
  color: #a1a1a1;
`;

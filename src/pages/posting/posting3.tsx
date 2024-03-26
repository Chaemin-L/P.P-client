import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { InputBox } from "@/components/common/Input-box";
import { ToggleSwitch } from "@/components/common/toggle-switch";
import { TopBar } from "@/components/common/top-bar";
import { PostingBoldText } from "@/components/posting/posting-bold-text";
import { postingState } from "@/recoil/atoms/posting-state";

export const Posting3 = () => {
  const [posting, setPosting] = useRecoilState(postingState);
  const today = new Date();
  const [hours, setHours] = useState(
    posting.startTimeSave ? posting.startDate.getHours() : today.getHours(),
  );
  const [minutes, setMinutes] = useState(
    posting.startTimeSave ? posting.startDate.getMinutes() : today.getMinutes(),
  );
  const [isLeftSelected, SetIsLeftSelected] = useState(
    hours < 12 ? true : false,
  );
  const navigate = useNavigate();

  const handleSave = () => {
    const tempSlot = isLeftSelected ? "AM" : "PM";
    const tempHours = isLeftSelected
      ? hours === 12
        ? 0
        : hours
      : hours === 12
        ? 12
        : hours + 12;
    posting.startDate.setHours(tempHours);
    posting.startDate.setMinutes(minutes);
    setPosting((prevPosting) => {
      const updatedPosting = {
        ...prevPosting,
        startDate: posting.startDate,
        slot: tempSlot,
        startTimeSave: true,
      };
      return updatedPosting;
    });
  };

  return (
    <PageContainer>
      <TopBar onClick={() => handleSave()}>1/10완료</TopBar>
      <PostingBoldText>
        시작 시간을
        <br />
        선택해주세요
      </PostingBoldText>
      <ToggleSwitch
        firstText="오전"
        secondText="오후"
        isLeftSelected={isLeftSelected}
        onChangeSelected={SetIsLeftSelected}
      />
      <BottomFixed align="row">
        <BottomFixed.Button
          onClick={() => {
            handleSave();
            navigate(-1);
          }}
        >
          이전
        </BottomFixed.Button>
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

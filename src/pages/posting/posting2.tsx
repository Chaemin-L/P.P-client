import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { PostingAppBar } from "@/components/posting/posting-app-bar";
import { PostingBoldText } from "@/components/posting/posting-bold-text";
import { PostingDatePicker } from "@/components/posting/posting-date-picker";
import { postingState } from "@/recoil/atoms/posting-state";

export const Posting2 = () => {
  const [posting, setPosting] = useRecoilState(postingState);
  const [startDate, setStartDate] = useState(
    posting.startDateSave ? posting.startDate : new Date(),
  );

  const navigate = useNavigate();

  const handleSave = () => {
    setPosting((prevPosting) => {
      const updatedPosting = {
        ...prevPosting,
        startDate: startDate,
        startDateSave: true,
      };
      return updatedPosting;
    });
  };

  return (
    <PageContainer>
      <PostingAppBar onClick={() => handleSave()}>1/10완료</PostingAppBar>
      <PostingBoldText style={{ marginBottom: "10px" }}>
        날짜를 선택해주세요
      </PostingBoldText>
      <span style={{ margin: "10px", fontSize: "18px" }}>
        {startDate.toLocaleString("ko-KR", { month: "long", day: "2-digit" })}
      </span>
      <PostingDatePicker startDate={startDate} setStartDate={setStartDate} />
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
            navigate("/posting/3");
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

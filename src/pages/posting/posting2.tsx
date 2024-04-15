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
      <PostingAppBar onClick={() => handleSave()} nowPage={2} />
      <PostingBoldText style={{ marginBottom: "0.56rem" }}>
        날짜를 선택해주세요
      </PostingBoldText>
      <SelectDay>
        {startDate.toLocaleString("ko-KR", { month: "long", day: "2-digit" })}
      </SelectDay>
      <PostingDatePicker startDate={startDate} setStartDate={setStartDate} />
      <BottomFixed alignDirection="row">
        <BottomFixed.Button
          color="blue"
          onClick={() => {
            handleSave();
            navigate(-1);
          }}
        >
          이전
        </BottomFixed.Button>
        <BottomFixed.Button
          color="blue"
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

const SelectDay = styled.span`
  margin: 5%;
  font-size: 1.39rem;
  width: 100%;
  text-align: center;
`;

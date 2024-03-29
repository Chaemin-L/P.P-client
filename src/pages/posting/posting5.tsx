import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { InputBox } from "@/components/common/Input-box";
import { PostingAppBar } from "@/components/posting/posting-app-bar";
import { PostingBoldText } from "@/components/posting/posting-bold-text";
import { useGetBankData } from "@/hooks/queries/useGetBankData";
import { postingState } from "@/recoil/atoms/posting-state";

export const Posting5 = () => {
  const [posting, setPosting] = useRecoilState(postingState);
  const [member, setMember] = useState(posting.memberNum);
  const navigate = useNavigate();
  const { data } = useGetBankData();

  const handleSave = () => {
    setPosting((prevPosting) => {
      const updatedPosting = { ...prevPosting, memberNum: member };
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
        1/10완료
      </PostingAppBar>
      <PostingBoldText>
        필요한 인원을
        <br />
        입력해주세요
      </PostingBoldText>
      <InputBox.InputNum
        value={member}
        onChange={(e) => {
          setMember(Number(e.target.value));
        }}
      >
        명
      </InputBox.InputNum>
      <BalanceText>
        지금 내 잔액은 {data ? data.availableBudget : 0}매듭 입니다.
      </BalanceText>
      <SumContainer>
        <SumText>합계</SumText>
        <SumNumberText>{posting.price * member}</SumNumberText>
        <SumText>매듭</SumText>
      </SumContainer>
      <BalanceText style={{ marginTop: "3%" }}>
        게시물 작성 후 내 잔액은{" "}
        {(data ? data.availableBudget : 0) - posting.price * member}
        매듭입니다.
      </BalanceText>
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
            navigate("/posting/6");
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

const BalanceText = styled.span`
  color: #d9d9d9;
  font-size: 18px;
  margin: 18% 0px 3% 0px;
`;

const SumContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 64.6%;
  border: solid;
  border-width: 1px 0;
  border-color: #d9d9d9;
  padding: 31px 0;
  color: #d9d9d9;
  align-items: flex-end;
  justify-content: space-between;
`;

const SumText = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

const SumNumberText = styled.span`
  font-size: 40px;
  font-weight: bold;
`;

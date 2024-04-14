import { ChangeEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { BankAccountData } from "@/api/types/bank-type";
import { BottomFixed } from "@/components/common/bottom-fixed";
import { InputBox } from "@/components/common/Input-box";
import { PostingAppBar } from "@/components/posting/posting-app-bar";
import { PostingBoldText } from "@/components/posting/posting-bold-text";
import { postingState } from "@/recoil/atoms/posting-state";
import { colorTheme } from "@/style/color-theme";

export const Posting5 = () => {
  const [posting, setPosting] = useRecoilState(postingState);
  const [member, setMember] = useState(posting.memberNum);
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state as BankAccountData;

  const handleSave = () => {
    setPosting((prevPosting) => {
      const updatedPosting = { ...prevPosting, memberNum: member };
      return updatedPosting;
    });
  };

  return (
    <PageContainer>
      <PostingAppBar onClick={() => handleSave()} nowPage={5} />
      <PostingBoldText>
        필요한 인원을
        <br />
        입력해주세요
      </PostingBoldText>
      <InputBox.InputNum
        value={member}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
  color: ${colorTheme.orange400};
  font-size: 1rem;
  margin: 18% 0px 3% 0px;
`;

const SumContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 64.6%;
  border: solid;
  border-width: 1px 0;
  border-color: #d9d9d9;
  padding: 1.72rem 0;
  align-items: flex-end;
  justify-content: space-between;
`;

const SumText = styled.span`
  font-size: 1.11rem;
  font-weight: bold;
  color: black;
`;

const SumNumberText = styled.span`
  font-size: 2.22rem;
  font-weight: bold;
  color: ${colorTheme.orange400};
`;

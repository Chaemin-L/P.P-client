import { ChangeEvent, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { BankAccountData } from "@/api/types/bank-type";
import { BottomFixed } from "@/components/common/bottom-fixed";
import { CommonInput } from "@/components/common/common-input";
import { PostingAppBar } from "@/components/posting/posting-app-bar";
import { PostingBoldText } from "@/components/posting/posting-bold-text";
import { postingState } from "@/recoil/atoms/posting-state";
import { colorTheme } from "@/style/color-theme";

export const Posting5 = () => {
  const [posting, setPosting] = useRecoilState(postingState);
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state as BankAccountData;
  const availableBudget = data?.availableBudget || 0;

  const [member, setMember] = useState(posting.memberNum.toString());
  const [isError, setIsError] = useState(false);
  const [isErrorText, setIsErrorText] = useState(false);

  const handleSave = () => {
    setPosting((prevPosting) => {
      const updatedPosting = { ...prevPosting, memberNum: Number(member) };
      return updatedPosting;
    });
  };

  useEffect(() => {
    if (isErrorText && member !== "") {
      setIsErrorText(false);
    }
  }, [member]);

  return (
    <PageContainer>
      <PostingAppBar onClick={() => handleSave()} nowPage={5} />
      <PostingBoldText style={{ marginBottom: "1.8rem" }}>
        필요한 인원을
        <br />
        입력해주세요
      </PostingBoldText>
      <CommonInput style={{ paddingLeft: "15%" }}>
        <CommonInput.InputInner
          value={member}
          setValue={setMember}
          isError={isError}
          setIsError={setIsError}
          maximum={Math.floor(availableBudget / posting.price)}
          minimum={0}
          gap={"3%"}
        >
          명
        </CommonInput.InputInner>
      </CommonInput>
      <ErrorMsg>
        {isError &&
          !isErrorText &&
          `잔액이 모자랍니다!
          필요 인원은 1~${Math.floor(availableBudget / posting.price)}명 사이로
          설정해주세요`}
        {isErrorText && `필요 인원을 1명 이상 정해주세요!`}{" "}
      </ErrorMsg>
      <BalanceText>지금 내 잔액은 {availableBudget}매듭 입니다.</BalanceText>
      <SumContainer>
        <SumText>합계</SumText>
        <SumNumberText>{posting.price * Number(member)}</SumNumberText>
        <SumText>매듭</SumText>
      </SumContainer>
      <BalanceText style={{ marginTop: "3%" }}>
        게시물 작성 후 내 잔액은{" "}
        {availableBudget - posting.price * Number(member)}
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
            if (member === "" || member === "0") {
              setIsErrorText(true);
              setIsError(true);
            } else {
              handleSave();
              navigate("/posting/6");
            }
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

const BalanceText = styled.div`
  color: ${colorTheme.orange400};
  font-size: 1rem;
  margin: 3% 0px 3% 0px;
`;

const ErrorMsg = styled.div`
  color: ${colorTheme.orange400};
  font-size: 1rem;
  text-align: center;
  font-weight: bold;
  line-height: 1.2rem;
  min-height: 2.5rem;
  height: auto;
  white-space: pre-line;
  padding: 0.5rem;
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

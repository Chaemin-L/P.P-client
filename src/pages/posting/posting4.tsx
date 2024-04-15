import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { CommonInput } from "@/components/common/common-input";
import { PostingAppBar } from "@/components/posting/posting-app-bar";
import { PostingBoldText } from "@/components/posting/posting-bold-text";
import { useGetBankData } from "@/hooks/queries/useGetBankData";
import { postingState } from "@/recoil/atoms/posting-state";
import { colorTheme } from "@/style/color-theme";

export const Posting4 = () => {
  const navigate = useNavigate();

  const [posting, setPosting] = useRecoilState(postingState);
  const { data } = useGetBankData();
  const availableBudget = data?.availableBudget || 0;

  const [price, setPrice] = useState(posting.price.toString());
  const [isError, setIsError] = useState(false);
  const [isErrorText, setIsErrorText] = useState(false);

  const handleSave = () => {
    setPosting((prevPosting) => {
      const updatedPosting = { ...prevPosting, price: Number(price) };
      return updatedPosting;
    });
  };

  useEffect(() => {
    if (isErrorText && price !== "") {
      setIsErrorText(false);
    }
  }, [price]);

  return (
    <PageContainer>
      <PostingAppBar onClick={() => handleSave()} nowPage={4} />
      <PostingBoldText style={{ marginBottom: "1.8rem" }}>
        활동의 소요시간을
        <br />
        입력해주세요
      </PostingBoldText>
      <TimeText>{`${Math.floor(Number(price) / 60)}시간 ${Number(price) % 60}분`}</TimeText>
      {isError && !isErrorText && (
        <ErrorMsg>
          {`잔액이 모자랍니다!
          소요시간은 1~${availableBudget}분 사이로
          설정해주세요`}
        </ErrorMsg>
      )}
      {isErrorText && <ErrorMsg>소요시간을 지정해주세요!</ErrorMsg>}
      <CommonInput style={{ paddingLeft: "15%" }}>
        <CommonInput.InputInner
          value={price}
          setValue={setPrice}
          isError={isError}
          setIsError={setIsError}
          maximum={availableBudget}
          minimum={0}
          gap={"3%"}
        >
          분
        </CommonInput.InputInner>
      </CommonInput>
      <BalanceText>활동시간 1분당 1매듭이 소요됩니다</BalanceText>
      <BalanceText style={{ color: colorTheme.orange400 }}>
        인당 {price} 매듭 소요
      </BalanceText>
      <BalanceText style={{ color: colorTheme.orange400, marginTop: "5%" }}>
        지금 내 사용 가능 잔액은 {data?.availableBudget}매듭입니다
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
            if (price === "" || price === "0") {
              setIsErrorText(true);
              setIsError(true);
            } else {
              handleSave();
              navigate("/posting/5", { state: data });
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

const BalanceText = styled.span`
  color: black;
  font-size: 18px;
  margin: 10% 0px 0px 0px;
  text-align: center;
`;

const TimeText = styled.span`
  color: ${colorTheme.orange400};
  font-size: 1.33rem;
  margin-bottom: 7%;
`;

const ErrorMsg = styled.div`
  color: ${colorTheme.orange400};
  font-size: 1rem;
  text-align: center;
  font-weight: bold;
  line-height: 1.1rem;
  white-space: pre-line;
`;

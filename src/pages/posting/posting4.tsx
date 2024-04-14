import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { InputBox } from "@/components/common/Input-box";
import { PostingAppBar } from "@/components/posting/posting-app-bar";
import { PostingBoldText } from "@/components/posting/posting-bold-text";
import { useGetBankData } from "@/hooks/queries/useGetBankData";
import { postingState } from "@/recoil/atoms/posting-state";
import { colorTheme } from "@/style/color-theme";

export const Posting4 = () => {
  const [posting, setPosting] = useRecoilState(postingState);
  const [price, setPrice] = useState(posting.price);
  const navigate = useNavigate();
  const { data } = useGetBankData();

  const handleSave = () => {
    setPosting((prevPosting) => {
      const updatedPosting = { ...prevPosting, price: price };
      return updatedPosting;
    });
  };

  return (
    <PageContainer>
      <PostingAppBar onClick={() => handleSave()} nowPage={4} />
      <PostingBoldText>
        활동의 소요시간을
        <br />
        입력해주세요
      </PostingBoldText>
      <TimeText>{`${Math.floor(price / 60)}시간 ${price % 60}분`}</TimeText>
      <InputBox.InputNum
        value={price}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setPrice(Number(e.target.value));
        }}
      >
        분
      </InputBox.InputNum>
      <BalanceText>
        활동시간 1분당 1매듭이
        <br />
        소요됩니다
      </BalanceText>
      <BalanceText style={{ color: colorTheme.orange400 }}>
        인당 {price} 매듭 소요
      </BalanceText>
      <BalanceText style={{ color: colorTheme.orange400 }}>
        지금 내 사용 가능 잔액은 {data?.availableBudget}입니다.
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
            navigate("/posting/5", { state: data });
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
  margin-bottom: 8%;
`;

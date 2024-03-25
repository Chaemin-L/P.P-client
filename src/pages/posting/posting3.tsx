import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { BottomButton } from "@/components/common/bottom-button";
import { InputBox } from "@/components/common/Input-box";
import { TopBar } from "@/components/common/top-bar";
import { postingState } from "@/recoil/atoms/posting-state";

export const Posting3 = () => {
  const [posting, setPosting] = useRecoilState(postingState);
  const [price, setPrice] = useState(posting.price);
  const navigate = useNavigate();

  return (
    <PageContainer>
      <TopBar
        onClick={() => {
          setPosting((prevPosting) => {
            const updatedPosting = { ...prevPosting, price: price };
            return updatedPosting;
          });
        }}
      >
        1/10완료
      </TopBar>
      <Text>금액을 입력해 주세요</Text>
      <InputBox.InputNum
        value={price}
        onChange={(e) => {
          setPrice(Number(e.target.value));
        }}
      >
        페이
      </InputBox.InputNum>
      <BalanceText>지금 내 잔액은 {}원 입니다</BalanceText>
      <RowBox>
        <BottomButton
          onClick={() => {
            setPosting((prevPosting) => {
              const updatedPosting = { ...prevPosting, price: price };
              return updatedPosting;
            });
            navigate(-1);
          }}
        >
          이전
        </BottomButton>
        <BottomButton
          onClick={() => {
            setPosting((prevPosting) => {
              const updatedPosting = { ...prevPosting, price: price };
              return updatedPosting;
            });
            navigate("/posting/4");
          }}
        >
          다음
        </BottomButton>
      </RowBox>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;

const Text = styled.span`
  margin: 40px 0px 45px 0px;
  font-size: 30px;
  color: #a1a1a1;
`;

const RowBox = styled.div`
  gap: 5.13%;
  display: flex;
  flex-direction: row;
`;

const BalanceText = styled.span`
  color: #d9d9d9;
  font-size: 19px;
  margin: 3% 0px 0px 0px;
`;

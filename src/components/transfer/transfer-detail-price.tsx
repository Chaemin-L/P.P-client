import { useState } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { TransferDetailProps } from "./type";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { InputBox } from "@/components/common/Input-box";
import { lastTransferState } from "@/recoil/atoms/last-transfet-state";
import { colorTheme } from "@/style/color-theme";

export const TransferDetailPrice = ({
  setScreen,
  memberCount,
}: TransferDetailProps) => {
  const [lastTransfer, setLastTransfer] = useRecoilState(lastTransferState);
  const [price, setPrice] = useState(lastTransfer.price);

  const handleSave = () => {
    setLastTransfer((prevLastTransfer) => {
      const updatedLastTransfer = {
        ...prevLastTransfer,
        price: price,
      };
      return updatedLastTransfer;
    });
  };

  return (
    <Wrapper>
      <CheckMsg>
        {lastTransfer.member == 1
          ? `${lastTransfer.users[0].nickName}님 외 ${lastTransfer.member - 1}분께`
          : `${lastTransfer.users[0].nickName}님께`}
        <br />
        얼마의 햇살을 송금할까요?
      </CheckMsg>
      <InputBox.InputNum
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
      >
        매듭
      </InputBox.InputNum>
      <div style={{ marginTop: "20px" }}>
        지금 내 잔액은 {lastTransfer.availableBudget}매듭 입니다
      </div>
      <BottomFixed alignDirection="column">
        <BottomFixed.Button
          style={{ backgroundColor: colorTheme.blue900 }}
          rounded={true}
          onClick={() => {
            handleSave();
            memberCount === 1
              ? setScreen("transfer-detail-one")
              : setScreen("transfer-detail");
          }}
        >
          다음
        </BottomFixed.Button>
      </BottomFixed>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  font-size: 1.11rem;
`;

const CheckMsg = styled.div`
  font-size: 1.39rem;
  margin: 5% 0;
  text-align: center;
  line-height: 1.67rem;
  color: ${colorTheme.orange400};
`;

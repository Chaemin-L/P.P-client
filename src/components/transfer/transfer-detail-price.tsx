import { useState } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { TransferProps } from "./type";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { InputBox } from "@/components/common/Input-box";
import { lastTransferState } from "@/recoil/atoms/last-transfet-state";
import { colorTheme } from "@/style/color-theme";

export const TransferDetailPrice = ({ setScreen }: TransferProps) => {
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
        {lastTransfer.users[0].name}님 외 {lastTransfer.member - 1}분께
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
        지금 내 잔액은 {lastTransfer.availableBudget}매듭입니다
      </div>
      <BottomFixed alignDirection="column">
        <BottomFixed.Button
          style={{ backgroundColor: colorTheme.blue900 }}
          isRounded={true}
          onClick={() => {
            handleSave();
            setScreen("transfer-detail");
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
  font-size: 20px;
`;

const CheckMsg = styled.div`
  font-size: 25px;
  margin: 5% 0;
  text-align: center;
  line-height: 30px;
  color: ${colorTheme.orange400};
`;

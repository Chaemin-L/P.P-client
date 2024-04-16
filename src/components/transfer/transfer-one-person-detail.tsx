import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { TransferDetailProps } from "./type";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { lastTransferState } from "@/recoil/atoms/last-transfet-state";
import { colorTheme } from "@/style/color-theme";

export const TransferOnePersonDetail = ({ setScreen }: TransferDetailProps) => {
  const [lastTransfer, setLastTransfer] = useRecoilState(lastTransferState);

  return (
    <Wrapper>
      <CheckMsg>
        {lastTransfer.users[0].nickName}님께
        <br />
        매듭을 송금할까요?
      </CheckMsg>
      <TransferExplainRowBox style={{ width: "57.7%" }}>
        <div style={{ width: "22%" }} />
        <NumberBigText>
          {lastTransfer.member * lastTransfer.price}
        </NumberBigText>
        <div style={{ width: "22%", textAlign: "right" }}>매듭</div>
      </TransferExplainRowBox>
      <div style={{ color: colorTheme.orange400 }}>
        지금 내 잔액은 {lastTransfer.availableBudget}매듭 입니다
      </div>
      <BottomFixed alignDirection="column">
        <BottomFixed.Button
          style={{ backgroundColor: colorTheme.blue900 }}
          onClick={() => {
            setScreen("transfer-detail-price");
          }}
        >
          매듭 변경하기
        </BottomFixed.Button>
        <BottomFixed.Button
          style={{ backgroundColor: colorTheme.blue900 }}
          onClick={() => {
            setScreen("transfer-detail-password");
          }}
        >
          송금하기
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
  font-size: 1.67rem;
  margin: 5% 0;
  text-align: center;
`;

const TransferExplainRowBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin: 10% 0;
`;

const NumberBigText = styled.div`
  font-size: 2.22rem;
  font-weight: bold;
  width: 56%;
  text-align: right;
  color: ${colorTheme.orange400};
`;

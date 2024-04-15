import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { TransferDetailProps } from "./type";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { lastTransferState } from "@/recoil/atoms/last-transfet-state";
import { colorTheme } from "@/style/color-theme";

export const TransferDetail = ({ setScreen }: TransferDetailProps) => {
  const [lastTransfer, setLastTransfer] = useRecoilState(lastTransferState);

  return (
    <Wrapper>
      <CheckMsg>
        {lastTransfer.users[0].nickName}님 외 {lastTransfer.member - 1}분께
        <br />
        일괄 송금할까요?
      </CheckMsg>
      <div style={{ color: colorTheme.orange400 }}>
        지금 내 잔액은 {lastTransfer.availableBudget}입니다
      </div>
      <TransferExplainBox>
        <TransferExplainRowBox>
          <div style={{ width: "34%" }}>인당</div>
          <NumberText>{lastTransfer.price}</NumberText>
          <div style={{ width: "22%", textAlign: "right" }}>매듭</div>
        </TransferExplainRowBox>
        <TransferExplainRowBox>
          <div style={{ width: "34%" }}>활동인원</div>
          <NumberText>{lastTransfer.member}</NumberText>
          <div style={{ width: "22%", textAlign: "right" }}>인원</div>
        </TransferExplainRowBox>
      </TransferExplainBox>
      <TransferExplainRowBox style={{ width: "57.7%", marginBottom: "5%" }}>
        <div style={{ width: "22%" }}>합계</div>
        <NumberBigText>
          {lastTransfer.member * lastTransfer.price}
        </NumberBigText>
        <div style={{ width: "22%", textAlign: "right" }}>매듭</div>
      </TransferExplainRowBox>
      <div style={{ color: colorTheme.orange400 }}>
        송금 후 내 잔액은{" "}
        {lastTransfer.availableBudget -
          lastTransfer.member * lastTransfer.price}
        매듭 입니다
      </div>
      <BottomFixed alignDirection="column">
        <BottomFixed.Button
          color="blue"
          onClick={() => {
            setScreen("transfer-detail-member");
          }}
        >
          수정하기
        </BottomFixed.Button>
        <BottomFixed.Button
          color="blue"
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
  font-size: 1.39rem;
  margin: 5% 0;
`;

const TransferExplainBox = styled.div`
  width: 63.1%;
  padding: 8% 2.7%;
  gap: 0.22rem;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
  margin: 5% 0;
`;

const TransferExplainRowBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 3%;
`;

const NumberText = styled.div`
  font-size: 1.67rem;
  font-weight: bold;
  width: 44%;
  text-align: right;
  color: ${colorTheme.orange400};
`;

const NumberBigText = styled.div`
  font-size: 2.22rem;
  font-weight: bold;
  width: 56%;
  text-align: right;
  color: ${colorTheme.orange400};
`;

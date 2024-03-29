import { styled } from "styled-components";

import { TransferProps } from "./type";

import { BottomFixed } from "@/components/common/bottom-fixed";

export const Transfer = (props: TransferProps) => {
  return (
    <Wrapper>
      <CheckMsg>매듭을 일괄 송금할까요?</CheckMsg>
      <div>지금 내 잔액은 {props.availableBudget}입니다</div>
      <TransferExplainBox>
        <TransferExplainRowBox>
          <div style={{ width: "34%" }}>인당</div>
          <NumberText>{props.price}</NumberText>
          <div style={{ width: "22%", textAlign: "right" }}>매듭</div>
        </TransferExplainRowBox>
        <TransferExplainRowBox>
          <div style={{ width: "34%" }}>활동인원</div>
          <NumberText>{props.member}</NumberText>
          <div style={{ width: "22%", textAlign: "right" }}>인원</div>
        </TransferExplainRowBox>
      </TransferExplainBox>
      <TransferExplainRowBox style={{ width: "57.7%", marginBottom: "5%" }}>
        <div style={{ width: "22%" }}>합계</div>
        <NumberBigText>{props.member * props.price}</NumberBigText>
        <div style={{ width: "22%", textAlign: "right" }}>매듭</div>
      </TransferExplainRowBox>
      <div>
        송금 후 내 잔액은 {props.availableBudget - props.member * props.price}
        매듭 입니다
      </div>
      <BottomFixed align="column">
        <BottomFixed.Button>수정하기</BottomFixed.Button>
        <BottomFixed.Button>송금하기</BottomFixed.Button>
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
  color: #d9d9d9;
  font-size: 20px;
`;

const CheckMsg = styled.div`
  font-size: 25px;
  margin: 5% 0;
`;

const TransferExplainBox = styled.div`
  width: 63.1%;
  padding: 8% 2.7%;
  gap: 4px;
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
  font-size: 30px;
  font-weight: bold;
  width: 44%;
  text-align: right;
`;

const NumberBigText = styled.div`
  font-size: 40px;
  font-weight: bold;
  width: 56%;
  text-align: right;
`;

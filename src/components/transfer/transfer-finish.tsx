import { useRecoilState, useResetRecoilState } from "recoil";
import { styled } from "styled-components";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { lastTransferState } from "@/recoil/atoms/last-transfet-state";
import { transferState } from "@/recoil/atoms/transfer-state";

export const TransferFinish = () => {
  const resetLastTransferRecoil = useResetRecoilState(lastTransferState);
  const resetTransferRecoil = useResetRecoilState(transferState);

  const [lastTransfer, setLastTransfer] = useRecoilState(lastTransferState);

  const handleClick = () => {
    resetLastTransferRecoil();
    resetTransferRecoil();
  };

  return (
    <Wrapper>
      <CheckMsg>송금완료</CheckMsg>
      <TransferExplainBox>
        {lastTransfer.member}명에게
        <br />
        {lastTransfer.price * lastTransfer.member}매듭을
        <br />
        송금하였습니다!
      </TransferExplainBox>
      <div>
        송금 후 내 잔액은{" "}
        {lastTransfer.availableBudget -
          lastTransfer.member * lastTransfer.price}
        매듭 입니다
      </div>
      <BottomFixed align="column">
        <BottomFixed.Button onClick={handleClick}>돌아가기</BottomFixed.Button>
        <BottomFixed.Button onClick={handleClick}>
          송금내역보기
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
  color: #d9d9d9;
  font-size: 20px;
`;

const CheckMsg = styled.div`
  font-size: 25px;
  margin: 5% 0;
`;

const TransferExplainBox = styled.div`
  width: 69.2%;
  padding: 8% 2.7%;
  margin: 5% 0;
  border-radius: 8.7%;
  background-color: #d9d9d9;
  color: #fff;
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  line-height: 150%;
`;

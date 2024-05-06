import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { lastTransferState } from "@/recoil/atoms/last-transfet-state";
import { colorTheme } from "@/style/color-theme";

export const TransferFinish = ({ onClick }: { onClick: () => void }) => {
  // const resetLastTransferRecoil = useResetRecoilState(lastTransferState);
  // const resetTransferRecoil = useResetRecoilState(transferState);

  const [lastTransfer] = useRecoilState(lastTransferState);

  // const handleClick = () => {
  //   resetLastTransferRecoil();
  //   resetTransferRecoil();
  // };

  return (
    <Wrapper>
      <CheckMsg style={{ color: colorTheme.blue900 }}>송금완료</CheckMsg>
      <TransferExplainBox>
        {lastTransfer.member == 1
          ? `${lastTransfer.users[0].nickName}님 외 ${lastTransfer.member - 1}분께`
          : `${lastTransfer.users[0].nickName}님께`}
        <br />
        {lastTransfer.price * lastTransfer.member}매듭을
        <br />
        송금하였습니다!
      </TransferExplainBox>
      :
      <div>
        송금 후 내 잔액은{" "}
        {lastTransfer.availableBudget -
          lastTransfer.member * lastTransfer.price}
        매듭 입니다
      </div>
      <BottomFixed alignDirection="column">
        <BottomFixed.Button color="blue" onClick={onClick}>
          돌아가기
        </BottomFixed.Button>
        {/* <BottomFixed.Button
          color="blue"
          onClick={handleClick}
        >
          송금내역보기 */}
        {/* </BottomFixed.Button> */}
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
  color: ${colorTheme.orange400};
  font-size: 1.11rem;
`;

const CheckMsg = styled.div`
  font-size: 1.39rem;
  margin: 5% 0;
`;

const TransferExplainBox = styled.div`
  width: 100%;
  padding: 8% 2.7%;
  margin: 5% 0 20%;
  color: ${colorTheme.orange400};
  font-size: 1.67rem;
  text-align: center;
  font-weight: bold;
  line-height: 150%;
`;

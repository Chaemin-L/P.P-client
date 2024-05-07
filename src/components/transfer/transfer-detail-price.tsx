import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { TransferDetailProps } from "./type";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { CommonInput } from "@/components/common/common-input";
import { lastTransferState } from "@/recoil/atoms/last-transfet-state";
import { transferState } from "@/recoil/atoms/transfer-state";
import { colorTheme } from "@/style/color-theme";

export const TransferDetailPrice = ({
  setScreen,
  memberCount,
}: TransferDetailProps) => {
  const [lastTransfer, setLastTransfer] = useRecoilState(lastTransferState);
  const [transfer] = useRecoilState(transferState);
  const [price, setPrice] = useState(lastTransfer.price.toString());
  const [isPriceError, setIsPriceError] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleSave = () => {
    setLastTransfer((prevLastTransfer) => {
      const updatedLastTransfer = {
        ...prevLastTransfer,
        price: Number(price),
      };
      return updatedLastTransfer;
    });
  };

  useEffect(() => {
    if (isError && price !== "") {
      setIsError(false);
    }
  }, [price]);

  return (
    <Wrapper>
      <CheckMsg>
        {lastTransfer.member !== 1
          ? `${lastTransfer.users[0].nickName}님 외 ${lastTransfer.member - 1}분께`
          : `${lastTransfer.users[0].nickName}님께`}
        <br />
        얼마의 햇살을 송금할까요?
      </CheckMsg>
      {isPriceError && !isError && (
        <ErrorMsg>
          {`송금할 매듭은 1~${Math.floor(lastTransfer.availableBudget / lastTransfer.member)}매듭 사이로
          설정해주세요`}
        </ErrorMsg>
      )}
      {isError && <ErrorMsg>송금할 매듭을 정해주세요!</ErrorMsg>}
      <CommonInput style={{ paddingLeft: "20%" }}>
        <CommonInput.InputInner
          value={price}
          setValue={setPrice}
          isError={isPriceError}
          setIsError={setIsPriceError}
          maximum={lastTransfer.availableBudget + transfer.price}
          minimum={1}
        >
          매듭
        </CommonInput.InputInner>
      </CommonInput>
      <div style={{ marginTop: "20px" }}>
        지금 내 잔액은 {lastTransfer.availableBudget + transfer.price}매듭
        입니다
      </div>
      <BottomFixed alignDirection="column">
        <BottomFixed.Button
          color="blue"
          rounded={true}
          onClick={() => {
            if (price === "") {
              setIsError(true);
              setIsPriceError(true);
            } else {
              handleSave();
              memberCount === 2
                ? setScreen("transfer-detail-one")
                : setScreen("transfer-detail");
            }
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

const ErrorMsg = styled.div`
  color: ${colorTheme.orange400};
  font-size: 1rem;
  text-align: center;
  font-weight: bold;
  line-height: 1.1rem;
  white-space: pre-line;
`;

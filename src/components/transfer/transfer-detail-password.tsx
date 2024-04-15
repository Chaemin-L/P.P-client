import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { TransferDetailProps } from "./type";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { lastTransferState } from "@/recoil/atoms/last-transfet-state";

export const TransferDetailPassword = ({ setScreen }: TransferDetailProps) => {
  const passwordRef = useRef<HTMLDivElement | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [lastTransfer, setLastTransfer] = useRecoilState(lastTransferState);

  return (
    <Wrapper>
      <CheckMsg>
        계좌 비밀번호를
        <br />
        입력해주세요
      </CheckMsg>
      <BottomFixed>
        <BottomFixed.Button
          color="blue"
          onClick={() => {
            setScreen("transfer-finish");
            setLastTransfer((prevLastTransfer) => {
              const updatedLastTransfer = {
                ...prevLastTransfer,
                transferState: true,
              };
              return updatedLastTransfer;
            });
          }}
        >
          이전
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
`;

const CheckMsg = styled.div`
  font-size: 1.39rem;
  margin: 5% 0;
`;

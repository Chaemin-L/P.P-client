import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { TransferDetailProps } from "./type";

import { transferRequest } from "@/api/types/bank-type";
import KnotNotBorderSVG from "@/assets/icons/knot-not-border.svg";
import { BottomFixed } from "@/components/common/bottom-fixed";
import { usePostChatTransfer } from "@/hooks/queries/usePostChatTransfer";
import { transferState } from "@/recoil/atoms/transfer-state";
import { colorTheme } from "@/style/color-theme";

const PASSWORD_LENGTH = 4;

export const TransferDetailPassword = ({
  setScreen,
  memberCount,
}: TransferDetailProps) => {
  const [lastTransfer, setLastTransfer] = useRecoilState(transferState);
  const [password, setPassword] = useState<string>("");
  const [isError, setIsError] = useState(false);
  const [isError500, setIsError500] = useState(false);
  const { mutate: postTransfer } = usePostChatTransfer();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (
      isNaN(Number(e.target.value)) ||
      e.target.value.toString().length > PASSWORD_LENGTH
    )
      return;
    else {
      setPassword(e.target.value);
      setIsError(false);
      setIsError500(false);
    }
  };

  useEffect(() => {
    if (password.length === PASSWORD_LENGTH) {
      const tempList = lastTransfer.users.map((item) => ({
        receiverAccountNumber: item.accountNumber,
        amount: lastTransfer.price,
      }));
      const temp: transferRequest = {
        dealId: lastTransfer.dealId,
        password: password,
        receiverAndAmounts: tempList,
        totalAmount: tempList.length * lastTransfer.price,
      };
      postTransfer(
        { postId: lastTransfer.postId, transferRequest: temp },
        {
          onSuccess: () => {
            setScreen("transfer-finish");
            setLastTransfer((prevLastTransfer) => {
              const updatedLastTransfer = {
                ...prevLastTransfer,
                transferState: true,
              };
              return updatedLastTransfer;
            });
          },
          onError: (e) => {
            console.log("error, ", e.message);
            setPassword("");
            e.message.includes("400") ? setIsError(true) : setIsError500(true);
          },
        },
      );
    }
  }, [password]);

  return (
    <Wrapper>
      <CheckMsg>
        계좌 비밀번호를
        <br />
        입력해주세요
      </CheckMsg>
      <InputArea>
        <input value={password} onChange={(e) => onChange(e)} />
        <PasswordWrapper>
          {password.split("").map((p, i) => (
            <KnotIcon src={KnotNotBorderSVG} key={i} />
          ))}
          {new Array(PASSWORD_LENGTH - password.length).fill(0).map((_, i) => (
            <DotsWrapper key={i}>
              <Dots />
            </DotsWrapper>
          ))}
        </PasswordWrapper>
      </InputArea>
      {isError && <ErrorMessage>비밀번호가 틀렸습니다</ErrorMessage>}
      {isError500 && (
        <ErrorMessage>{`오류가 발생했습니다
      다시 시도해주세요`}</ErrorMessage>
      )}
      <BottomFixed>
        <BottomFixed.Button
          color="blue"
          onClick={() => {
            memberCount === 2
              ? setScreen("transfer-detail-one")
              : setScreen("transfer-detail");
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
  margin: 5% 0 15%;
  text-align: center;
`;

const InputArea = styled.div`
  width: 90%;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  position: relative;

  & > input {
    position: relative;
    width: 100%;
    background: transparent;
    border: 0;
    color: transparent;
    z-index: 10;
  }
`;

const PasswordWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 3.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${colorTheme.orange400};
  font-size: 2.7rem;
  font-variant-numeric: tabular-nums;
  text-align: center;
  & > * {
    flex: 1;
  }
`;

const KnotIcon = styled.img`
  width: 2.06rem;
  height: 2.06rem;
`;

const DotsWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dots = styled.div`
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background-color: ${colorTheme.orange200};
`;

const ErrorMessage = styled.div`
  font-size: 1rem;
  color: ${colorTheme.orange400};
  text-align: center;
  line-height: 120%;
  margin-top: 10%;
  white-space: pre-line;
`;

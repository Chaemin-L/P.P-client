import { styled } from "styled-components";

import { BottomFixed } from "@/components/common/bottom-fixed";

export const TransferDetailPassword = () => {
  return (
    <Wrapper>
      <CheckMsg>
        계좌 비밀번호를
        <br />
        입력해주세요
      </CheckMsg>
      <BottomFixed>
        <BottomFixed.Button color="blue">이전</BottomFixed.Button>
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

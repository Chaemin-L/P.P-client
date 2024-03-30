import { styled } from "styled-components";

import { memberItem } from "./type";

export const TransferDetailMemberItem = ({
  isTrue,
  setIsTrue,
  ...props
}: memberItem) => {
  return (
    <Wrapper
      style={{
        backgroundColor: isTrue ? "#d9d9d9" : "#fff",
        color: isTrue ? "#fff" : "#d9d9d9",
      }}
      onClick={setIsTrue}
    >
      {props.children}
    </Wrapper>
  );
};

const Wrapper = styled.button`
  width: 90%;
  padding: 5px 20px;
  font-size: 25px;
  border-radius: 15px;
  border: none;
`;

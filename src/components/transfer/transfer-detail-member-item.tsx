import { styled } from "styled-components";

import { memberItem } from "./type";

import { colorTheme } from "@/style/color-theme";

export const TransferDetailMemberItem = ({
  isTrue,
  setIsTrue,
  ...props
}: memberItem) => {
  return (
    <Wrapper>
      <StyledButton
        style={{
          backgroundColor: isTrue ? colorTheme.orange400 : "#fff",
          color: isTrue ? "#fff" : "black",
        }}
        onClick={setIsTrue}
      >
        {props.children}
      </StyledButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const StyledButton = styled.button`
  width: 90%;
  padding: 7px 20px;
  font-size: 25px;
  border-radius: 15px;
  border: none;
  text-align: center;
`;

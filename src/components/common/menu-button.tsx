import { PropsWithChildren } from "react";
import { styled } from "styled-components";

export const MenuButton = ({ children }: PropsWithChildren) => {
  return (
    <ButtonWrapper>
      <StyledButton>{children}</StyledButton>
    </ButtonWrapper>
  );
};

const ButtonWrapper = styled.div`
  width: 100%;
  margin: auto;
  position: absolute;
  padding: 0 55px 19px;
  bottom: 0;
  left: 0;
`;

const StyledButton = styled.button`
  width: 100%;
  height: 100px;
  padding: 8px 10px;
  border-radius: 40px;
  border: 0;
  background-color: #d9d9d9;
  font-size: 1.3rem;
  text-align: center;
`;

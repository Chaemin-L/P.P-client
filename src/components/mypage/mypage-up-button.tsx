import { styled } from "styled-components";

import UpArrowSVG from "@/assets/images/up-arrow.svg";
import { colorTheme } from "@/style/color-theme";

export const MypageUpButton = ({ onHandler }: { onHandler: () => void }) => {
  return (
    <FixedButton
      onClick={() => {
        onHandler();
      }}
    >
      <ButtonImg src={UpArrowSVG} />
      <ButtonDiv>맨위로</ButtonDiv>
    </FixedButton>
  );
};

const FixedButton = styled.button`
  width: 4.68rem;
  height: 4.68rem;
  position: fixed;
  background-color: ${colorTheme.blue500};
  border-radius: 1.67rem;
  border: none;
  bottom: 4rem;
  right: 0.5rem;
  z-index: 99;
  display: flex;
  flex-direction: column;
  gap: 3%;
  justify-content: center;
  align-items: center;
`;

const ButtonImg = styled.img`
  width: 2em;
  height: 1rem;
`;

const ButtonDiv = styled.div`
  font-size: 1rem;
  color: white;
`;

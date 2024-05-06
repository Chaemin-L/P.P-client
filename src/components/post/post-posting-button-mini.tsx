import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import PlusWhiteSVG from "@/assets/icons/plus-white.svg";
import { colorTheme } from "@/style/color-theme";

export const PostPostingButtonMini = () => {
  const navigate = useNavigate();

  return (
    <FixedButton
      onClick={() => {
        navigate("/posting/1");
      }}
    >
      <PlusImg src={PlusWhiteSVG} />
    </FixedButton>
  );
};

const FixedButton = styled.button`
  width: 4.72rem;
  height: 4.72rem;
  position: fixed;
  background-color: ${colorTheme.blue500};
  border-radius: 35%;
  border: none;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 99;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlusImg = styled.img`
  width: 2rem;
  height: 2rem;
`;

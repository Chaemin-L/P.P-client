import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import plusImg from "@/assets/images/plus-img.png";
import { colorTheme } from "@/style/color-theme";

export const PostPostingButtonMini = () => {
  const navigate = useNavigate();

  return (
    <FixedButton
      onClick={() => {
        navigate("/posting");
      }}
    >
      <ImgBackground>
        <Img src={plusImg} />
      </ImgBackground>
    </FixedButton>
  );
};

const FixedButton = styled.button`
  width: 21.8%;
  padding-top: 21.8%;
  position: fixed;
  background-color: ${colorTheme.blue900};
  border-radius: 8%;
  border: none;
  top: 1;
  right: 1;
`;

const ImgBackground = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Img = styled.img`
  width: 42.4%;
  height: 42.4%;
  position: absolute;
  top: 28.8%;
  left: 28.8%;
`;

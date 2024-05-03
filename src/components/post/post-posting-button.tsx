import { useNavigate } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import styled from "styled-components";

import PlusWhiteSVG from "@/assets/icons/plus-white.svg";
import { postingState } from "@/recoil/atoms/posting-state";
import { colorTheme } from "@/style/color-theme";

export const PostPostingButton = () => {
  const resetRecoil = useResetRecoilState(postingState);
  const navigate = useNavigate();

  return (
    <Wrapper>
      <PostingButton
        onClick={() => {
          resetRecoil();
          navigate("/posting/1");
        }}
      >
        <PlusImgBox>
          <PlusImg src={PlusWhiteSVG} />
        </PlusImgBox>
        <ButtonSpan>게시글 만들기</ButtonSpan>
      </PostingButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 0.5rem 5.12% 0.8rem;
`;

const PostingButton = styled.button`
  border: none;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1.3rem 2.4rem;
  background-color: ${colorTheme.blue500};
  border-radius: 1.8rem;
`;

const PlusImgBox = styled.div`
  width: 10.3%;
  padding-top: 10.3%;
  position: relative;
`;

const PlusImg = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const ButtonSpan = styled.span`
  font-size: 1.8rem;
  color: white;
`;

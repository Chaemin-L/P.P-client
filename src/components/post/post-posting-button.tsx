import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import plusImg from "@/assets/images/plus-img.png";
import { colorTheme } from "@/style/color-theme";

export const PostPostingButton = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <PostingButton
        onClick={() => {
          navigate("/posting/1");
        }}
      >
        <PlusImg src={plusImg} />
        <ButtonSpan>게시글 만들기</ButtonSpan>
      </PostingButton>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 9px 5.12% 14px;
`;

const PostingButton = styled.button`
  border: none;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 23px 12.8%;
  background-color: ${colorTheme.blue900};
  border-radius: 30px;
`;

const PlusImg = styled.img`
  width: 36px;
  height: 36px;
`;

const ButtonSpan = styled.span`
  font-size: 32px;
  color: white;
`;

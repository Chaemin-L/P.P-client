import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { BottomButton } from "@/components/common/bottom-button";
import { TopBar } from "@/components/common/top-bar";
import { PostingInput } from "@/components/posting/posting-input";
import { postingState } from "@/recoil/atoms/posting-state";

export const Posting4 = () => {
  const [posting, setPosting] = useRecoilState(postingState);
  const [member, setMember] = useState(posting.memberNum);
  const navigate = useNavigate();

  return (
    <PageContainer>
      <TopBar
        onClick={() => {
          setPosting((prevPosting) => {
            const updatedPosting = { ...prevPosting, memberNum: member };
            return updatedPosting;
          });
        }}
      >
        1/10완료
      </TopBar>
      <Text>필요한 인원을\n입력해주세요</Text>
      <PostingInput.InputNum
        value={member}
        onChange={(e) => {
          setMember(Number(e.target.value));
        }}
      >
        명
      </PostingInput.InputNum>
      <RowBox>
        <BottomButton
          onClick={() => {
            setPosting((prevPosting) => {
              const updatedPosting = { ...prevPosting, memberNum: member };
              return updatedPosting;
            });
            navigate(-1);
          }}
        >
          이전
        </BottomButton>
        <BottomButton
          onClick={() => {
            setPosting((prevPosting) => {
              const updatedPosting = { ...prevPosting, memberNum: member };
              return updatedPosting;
            });
          }}
        >
          다음
        </BottomButton>
      </RowBox>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

const Text = styled.span`
  margin: 40px 0px 45px 0px;
  font-size: 30px;
  color: #a1a1a1;
`;

const RowBox = styled.div`
  gap: 5.13%;
  display: flex;
  flex-direction: row;
  white-space: pre-wrap;
`;

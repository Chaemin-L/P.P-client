import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { RequestPostingProps } from "@/api/types/post-type";
import { BottomFixed } from "@/components/common/bottom-fixed";
import { PostingAppBar } from "@/components/posting/posting-app-bar";
import { PostingBoldText } from "@/components/posting/posting-bold-text";
import { PostingInput } from "@/components/posting/posting-input";
import { usePostPosting } from "@/hooks/queries/usePostPosting";
import { postingState } from "@/recoil/atoms/posting-state";
import { FormatDateString } from "@/utils/format-date-string";

export const Posting7 = () => {
  const [posting, setPosting] = useRecoilState(postingState);
  const [content, setContent] = useState(posting.content);
  const navigate = useNavigate();
  const postPosting = usePostPosting();

  const handleSave = () => {
    setPosting((prevPosting) => {
      const updatedPosting = { ...prevPosting, content: content };
      return updatedPosting;
    });
  };

  const handlePostPosting = () => {
    const tempProps: RequestPostingProps = {
      title: posting.title,
      content: content,
      startDate: FormatDateString(posting.startDate),
      location: posting.location,
      volunteerTime: posting.price,
      maxNumOfPeople: posting.memberNum,
    };

    postPosting.mutate(tempProps);
  };

  return (
    <PageContainer>
      <PostingAppBar
        onClick={() => {
          handleSave();
          navigate(-1);
        }}
        nowPage={7}
      />
      <PostingBoldText>활동 내용을 적어보세요</PostingBoldText>
      <PostingInput.InputContent
        value={content}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          setContent(e.target.value);
        }}
      />
      <BottomFixed>
        <BottomFixed.Button
          color="orange"
          onClick={() => {
            handleSave();
            handlePostPosting();
          }}
        >
          게시물 만들기
        </BottomFixed.Button>
      </BottomFixed>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;

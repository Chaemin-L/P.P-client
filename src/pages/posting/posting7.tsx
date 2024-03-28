import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { RequestPostingProps } from "@/api/type";
import { BottomFixed } from "@/components/common/bottom-fixed";
import { TopBar } from "@/components/common/top-bar";
import { PostingBoldText } from "@/components/posting/posting-bold-text";
import { PostingInput } from "@/components/posting/posting-input";
import { usePostPosting } from "@/hooks/queries/usePostPosting";
import { postingState } from "@/recoil/atoms/posting-state";
import { FormatDateString } from "@/utils/format-date-string";

export const Posting7 = () => {
  const [posting, setPosting] = useRecoilState(postingState);
  const [contents, setContents] = useState(posting.contents);
  const navigate = useNavigate();
  const postPosting = usePostPosting();

  const handleSave = () => {
    setPosting((prevPosting) => {
      const updatedPosting = { ...prevPosting, contents: contents };
      return updatedPosting;
    });
  };

  const handlePostPosting = () => {
    const tempProps: RequestPostingProps = {
      title: posting.title,
      content: posting.contents,
      startDate: FormatDateString(posting.startDate),
      location: posting.location,
      volunteerTime: posting.price,
      maxNumOfPeople: posting.memberNum,
    };

    console.log("Request:::::", tempProps);
    postPosting.mutate(tempProps);
  };

  return (
    <PageContainer>
      <TopBar
        onClick={() => {
          handleSave();
          navigate(-1);
        }}
      >
        1/10완료
      </TopBar>
      <PostingBoldText>활동 내용을 적어보세요</PostingBoldText>
      <PostingInput.InputContent
        value={contents}
        onChange={(e) => {
          setContents(e.target.value);
        }}
      />
      <BottomFixed>
        <BottomFixed.Button
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

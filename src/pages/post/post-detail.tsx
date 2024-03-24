import { useParams } from "react-router-dom";
import { styled } from "styled-components";

import { ActivityBox } from "@/components/common/activity-box";
import { BottomButton } from "@/components/common/bottom-button";
import { DefaultLayout } from "@/components/layout/default-layout";

export const PostDetailPage = () => {
  const { id } = useParams();

  return (
    <DefaultLayout>
      <Container>
        <>현재 보고계신 게시글의 id는 {id}입니다.</>
        <ActivityBox>
          <ActivityBox.Title />
          <ActivityBox.ProfileImage />
          <ActivityBox.ProfileImage />
          <ActivityBox.Time />
          <ActivityBox.Date />
          <ActivityBox.Location />
          <ActivityBox.Description />
        </ActivityBox>
        <BottomButton onClick={() => console.log("신청합니다")}>
          신청하기
        </BottomButton>
      </Container>
    </DefaultLayout>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

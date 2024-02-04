import { useParams } from "react-router-dom";
import { styled } from "styled-components";

import { ActivityBox } from "@/components/common/activity-box";
import { DefaultLayout } from "@/components/layout/default-layout";

export const MyPostPage = () => {
  const { id } = useParams();

  return (
    <DefaultLayout>
      <Container>
        현재 보고계신 {"내"} 게시글의 id는 {id}입니다.
        <ActivityBox>
          <ActivityBox.CompleteButton />
          <ActivityBox.EditButton />
          <ActivityBox.Title />
          <ActivityBox.ProfileImage />
          <ActivityBox.ProfileImage />
          <ActivityBox.Time />
          <ActivityBox.Date />
          <ActivityBox.Location />
          <ActivityBox.Description />
          <ActivityBox.MemberNum />
        </ActivityBox>
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

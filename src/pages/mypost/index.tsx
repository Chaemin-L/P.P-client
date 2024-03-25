import { styled } from "styled-components";

import { ActivityBox } from "@/components/common/activity-box";
import { BottomButton } from "@/components/common/bottom-button";
import { DefaultLayout } from "@/components/layout/default-layout";
import activityData from "@/data/activity-data.json";

export const MyPostPage = () => {
  /* postId 식별
  const { id } = useParams();
  */

  return (
    <DefaultLayout>
      <Container>
        <ActivityBox {...activityData} />
        <BottomButton onClick={() => console.log("참여관리")}>
          참여관리
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

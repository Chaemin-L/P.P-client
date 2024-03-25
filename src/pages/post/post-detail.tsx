import { styled } from "styled-components";

import { ActivityBox } from "@/components/common/activity-box";
import { BottomButton } from "@/components/common/bottom-button";
import { DefaultLayout } from "@/components/layout/default-layout";
import activityData from "@/data/activity-data.json";

export const PostDetailPage = () => {
  /* postId 식별
  const { id } = useParams();
  */

  return (
    <DefaultLayout>
      <ActivityBox {...activityData} />
      <BottomButton onClick={() => console.log("신청합니다")}>
        신청하기
      </BottomButton>
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

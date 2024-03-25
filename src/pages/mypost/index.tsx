import { styled } from "styled-components";

import { ActivityBox } from "@/components/common/activity-box";
import { BottomFixed } from "@/components/common/bottom-fixed";
import { DefaultLayout } from "@/components/layout/default-layout";
import activityData from "@/data/activity-data.json";

export const MyPostPage = () => {
  /* postId 식별
  const { id } = useParams();
  */

  return (
    <DefaultLayout>
      <ActivityBox {...activityData} />
      <BottomFixed align="column">
        <BottomFixed.Button onClick={() => console.log("참여관리")}>
          끌어올리기
        </BottomFixed.Button>
        <BottomFixed.Button onClick={() => console.log("참여관리")}>
          참여관리
        </BottomFixed.Button>
      </BottomFixed>
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

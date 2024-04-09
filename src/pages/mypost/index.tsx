import { styled } from "styled-components";

import { ActivityBox } from "@/components/common/activity-box";
import { BottomFixed } from "@/components/common/bottom-fixed";
import { Button } from "@/components/common/button";
import { DefaultLayout } from "@/components/layout/default-layout";
import activityData from "@/data/activity-data.json";

export const MyPostPage = () => {
  /* postId 식별
  const { id } = useParams();
  */

  return (
    <DefaultLayout>
      <JustifyWrapper>
        <Button>모집완료</Button>
        <Button>수정하기</Button>
      </JustifyWrapper>
      <ActivityBox {...activityData} />
      <BottomFixed alignDirection="column">
        <BottomFixed.Button
          onClick={() => console.log("참여관리 페이지로 이동")}
        >
          끌어올리기
        </BottomFixed.Button>
        <BottomFixed.Button
          onClick={() => console.log("참여관리 페이지로 이동")}
        >
          참여관리
        </BottomFixed.Button>
      </BottomFixed>
    </DefaultLayout>
  );
};

const JustifyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

import { styled } from "styled-components";

import { ActivityBox } from "@/components/common/activity-box";
import { BottomFixed } from "@/components/common/bottom-fixed";
import { Button } from "@/components/common/button";
import { DefaultLayout } from "@/components/layout/default-layout";
import activityData from "@/data/activity-data.json";

export const PostDetailPage = () => {
  /* postId 식별
  const { id } = useParams();
  */

  return (
    <DefaultLayout>
      <ActivityBox {...activityData} />
      <ButtonWrapper>
        <Button primary isSmall onClick={() => console.log("신고합니다")}>
          신고
        </Button>
      </ButtonWrapper>
      <BottomFixed>
        <BottomFixed.Button>신청하기</BottomFixed.Button>
      </BottomFixed>
    </DefaultLayout>
  );
};

const ButtonWrapper = styled.div`
  float: right;
`;

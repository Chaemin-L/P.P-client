import { useState } from "react";
import { styled } from "styled-components";

import { ActivityBox } from "@/components/common/activity-box";
import { BottomFixed } from "@/components/common/bottom-fixed";
import { Button } from "@/components/common/button";
import { Modal } from "@/components/common/modal";
import { DefaultLayout } from "@/components/layout/default-layout";
import activityData from "@/data/activity-data.json";

export const PostDetailPage = () => {
  /* postId 식별
  const { id } = useParams();
  */

  // TODO: 자신이 신청한 게시글인지 확인하는 로직
  const [apply, setApply] = useState<boolean>(false);
  const [reportModal, setReportModal] = useState<boolean>(false);

  return (
    <DefaultLayout>
      <ActivityBox {...activityData} />
      <ButtonWrapper>
        <Button primary isSmall onClick={() => setReportModal(true)}>
          신고
        </Button>
        {reportModal && (
          <Modal onClose={() => setReportModal(false)}>
            <Modal.Title text="신청을\n취소하시겠습니까?" />
            <Modal.Button>취소하기</Modal.Button>
          </Modal>
        )}
      </ButtonWrapper>
      <BottomFixed>
        <BottomFixed.Button
          isRounded={!apply}
          onClick={() => setApply((apply) => !apply)}
        >
          신청하기
        </BottomFixed.Button>
      </BottomFixed>
    </DefaultLayout>
  );
};

const ButtonWrapper = styled.div`
  float: right;
`;

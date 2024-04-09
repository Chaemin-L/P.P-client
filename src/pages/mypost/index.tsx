import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import { ActivityBox } from "@/components/common/activity-box";
import { AppBar } from "@/components/common/app-bar";
import { BottomFixed } from "@/components/common/bottom-fixed";
import { Button } from "@/components/common/button";
import { Modal } from "@/components/common/modal";
import { DefaultLayout } from "@/components/layout/default-layout";
import activityData from "@/data/activity-data.json";

export const MyPostPage = () => {
  /* postId 식별
  const { id } = useParams();
  */

  const [repostModal, setRepostModal] = useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <DefaultLayout
      appbar={
        <AppBar>
          <AppBar.AppBarNavigate>
            <AppBar.BackButton />
          </AppBar.AppBarNavigate>
        </AppBar>
      }
    >
      <JustifyWrapper>
        <Button color="orange">모집완료</Button>
        <Button color="orange">편집하기</Button>
      </JustifyWrapper>
      <ActivityBox {...activityData} />
      <BottomFixed alignDirection="column">
        <BottomFixed.Button onClick={() => setRepostModal(true)}>
          끌어올리기
        </BottomFixed.Button>
        <BottomFixed.Button onClick={() => navigate("applicant")}>
          참여관리
        </BottomFixed.Button>
      </BottomFixed>
      {repostModal && (
        <Modal onClose={() => setRepostModal(false)}>
          <Modal.Title text="게시물을\n끌어올릴까요?" />
          <p>
            끌어올릴 시 전체 게시물
            <br />
            상단으로 올라갑니다
          </p>
          <Modal.Button color="orange" onClick={() => setRepostModal(false)}>
            끌어올리기
          </Modal.Button>
        </Modal>
      )}
    </DefaultLayout>
  );
};

const JustifyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

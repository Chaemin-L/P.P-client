import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { css, styled } from "styled-components";

import { ActivityBox } from "@/components/common/activity-box";
import { AppBar } from "@/components/common/app-bar";
import { BottomFixed } from "@/components/common/bottom-fixed";
import { Button } from "@/components/common/button";
import { Modal } from "@/components/common/modal";
import { DefaultLayout } from "@/components/layout/default-layout";
import activityData from "@/data/activity-data.json";
import { colorTheme } from "@/style/color-theme";

export const MyPostPage = () => {
  /* postId 식별
  const { id } = useParams();
  */

  // TODO: Remove this test state
  const [status, setStatus] = useState<
    "RECRUITING" | "RECRUITING_COMPLETED" | "TRANSITION_COMPLETED"
  >("RECRUITING");

  const [repostModal, setRepostModal] = useState<boolean>(false);
  const [statusModal, setStatusModal] = useState<boolean>(false);

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
      {status === "RECRUITING" ? (
        <JustifyWrapper>
          <Button
            color="orange"
            onClick={() => {
              setStatusModal(true);
            }}
          >
            모집완료
          </Button>
          <Button color="orange">편집하기</Button>
        </JustifyWrapper>
      ) : (
        <DoneWrapper>모집완료</DoneWrapper>
      )}
      <ActivityBox {...activityData} status={status} />
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
      {statusModal && (
        <Modal onClose={() => setStatusModal(false)}>
          <Modal.Title text="모집을\n끝내시겠습니까?" />

          <Modal.Button
            color="orange"
            onClick={() => {
              setStatusModal(false);
              setStatus("RECRUITING_COMPLETED");
            }}
          >
            모집종료
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

const DoneWrapper = styled.div`
  position: relative;
  width: 100dvw;
  left: -15px;
  padding: 25px;
  margin-bottom: 20px;
  background-color: ${colorTheme.blue100};
  color: white;
  font-size: 1.3rem;
  text-align: center;
`;

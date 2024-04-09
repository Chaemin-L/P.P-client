import { useState } from "react";
import { styled } from "styled-components";

import { ActivityBox } from "@/components/common/activity-box";
import { AppBar } from "@/components/common/app-bar";
import { BottomFixed } from "@/components/common/bottom-fixed";
import { BottomSheet } from "@/components/common/bottom-sheet";
import { Button } from "@/components/common/button";
import { Modal } from "@/components/common/modal";
import { DefaultLayout } from "@/components/layout/default-layout";
import { Report } from "@/components/report/report";
import activityData from "@/data/activity-data.json";

export const PostDetailPage = () => {
  /* postId 식별
  const { id } = useParams();
  */

  // TODO: 자신이 신청한 게시글인지 확인하는 로직
  const [apply, setApply] = useState<boolean>(false);
  const [reportModal, setReportModal] = useState(false);
  const [reportBottomSheet, setReportBottomSheet] = useState(false);

  const [modal, setModal] = useState<boolean>(false);

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
      <ActivityBox {...activityData} />
      <ButtonWrapper>
        <Button
          rounded
          color="orange"
          onClick={() => setReportBottomSheet(true)}
        >
          신고
        </Button>
      </ButtonWrapper>
      <BottomSheet
        style={{ height: window.innerHeight > 720 ? "81%" : "90%" }}
        isOpened={reportBottomSheet}
        onChangeIsOpened={() => setReportBottomSheet(false)}
      >
        <Report
          postId="10"
          onSuccessReport={() => {
            console.log("신고가 접수!");
            setReportBottomSheet(false);
            setReportModal(true);
          }}
        />
      </BottomSheet>
      {reportModal && (
        <Modal
          onClose={() => {
            setReportModal(false);
          }}
        >
          <Modal.Title text="신고가 접수되었습니다." />
        </Modal>
      )}
      <BottomFixed>
        {!apply ? (
          <BottomFixed.Button color="orange" onClick={() => setModal(true)}>
            신청하기
          </BottomFixed.Button>
        ) : (
          <BottomFixed.Button isRounded={false} onClick={() => setModal(true)}>
            신청 취소하기
          </BottomFixed.Button>
        )}
      </BottomFixed>
      {modal &&
        (!apply ? (
          <Modal
            onClose={() => {
              setModal(false);
              setApply(true);
            }}
          >
            <EmptyBox>
              <Modal.Title text="신청되었습니다" />
            </EmptyBox>
          </Modal>
        ) : (
          <Modal onClose={() => setModal(false)}>
            <Modal.Title text="신청을\n취소하시겠습니까?" />
            <Modal.Button
              color="orange"
              onClick={() => {
                setApply(false);
                setModal(false);
              }}
            >
              취소하기
            </Modal.Button>
          </Modal>
        ))}
    </DefaultLayout>
  );
};

const ButtonWrapper = styled.div`
  float: right;
`;

const EmptyBox = styled.div`
  padding: 10px;
`;

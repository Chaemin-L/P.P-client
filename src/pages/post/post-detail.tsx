import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";

import { PostType } from "@/api/types/post-type";
import backImg from "@/assets/images/back-img.png";
import { ActivityBox } from "@/components/common/activity-box";
import { AppBar } from "@/components/common/app-bar";
import { BottomFixed } from "@/components/common/bottom-fixed";
import { BottomSheet } from "@/components/common/bottom-sheet";
import { Button } from "@/components/common/button";
import { Modal } from "@/components/common/modal";
import { DefaultLayout } from "@/components/layout/default-layout";
import { Report } from "@/components/report/report";
import { useChangeStatus } from "@/hooks/queries/useChangeStatus";
import { useDeleteApply } from "@/hooks/queries/useDeleteApply";
import { useGetPostDetail } from "@/hooks/queries/useGetPostDetail";
import { usePostApply } from "@/hooks/queries/usePostApply";
import { usePullUp } from "@/hooks/queries/usePullUp";
import { colorTheme } from "@/style/color-theme";

export const PostDetailPage = () => {
  const { postId } = useParams();

  const [statusModal, setStatusModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [repostModal, setRepostModal] = useState(false);
  const [reportBottomSheet, setReportBottomSheet] = useState(false);

  const [applyModal, setApplyModal] = useState<boolean>(false);

  const { data } = useGetPostDetail(postId!);
  const { mutate: applyActivity } = usePostApply(postId!);
  const { mutate: cancelActivity } = useDeleteApply(postId!);
  const { mutate: pullUp } = usePullUp(postId!);
  const { mutate: changeStatus } = useChangeStatus(postId!);

  const navigate = useNavigate();

  return (
    <DefaultLayout
      appbar={
        <AppBar>
          <AppBar.AppBarNavigate>
            <StyledButton onClick={() => navigate("/post")}>
              <BackButtonSVG src={backImg} />
            </StyledButton>
          </AppBar.AppBarNavigate>
        </AppBar>
      }
    >
      {data?.userCurrentStatus.isWriter ? (
        data?.marketPostResponse.status === "RECRUITING" ? (
          <JustifyWrapper>
            <Button
              color="orange"
              onClick={() => {
                changeStatus("RECRUITMENT_COMPLETED");
              }}
            >
              모집완료
            </Button>
            <Button color="orange">편집하기</Button>
          </JustifyWrapper>
        ) : (
          <DoneWrapper>모집완료</DoneWrapper>
        )
      ) : (
        <></>
      )}
      <ActivityBox
        {...(data?.marketPostResponse as PostType)}
        startDate={
          data?.marketPostResponse.startDate.split(" ") ?? ["0", "0", "0", "0"]
        }
      />
      {!data?.userCurrentStatus.isWriter && (
        <ButtonWrapper>
          <Button
            rounded
            color="orange"
            onClick={() => setReportBottomSheet(true)}
          >
            신고
          </Button>
        </ButtonWrapper>
      )}
      <BottomSheet
        style={{ height: window.innerHeight > 720 ? "81%" : "90%" }}
        isOpened={reportBottomSheet}
        onChangeIsOpened={() => setReportBottomSheet(false)}
      >
        <Report
          postId={data?.marketPostResponse.postId.toString() ?? ""}
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
      <BottomFixed alignDirection="column">
        {data?.userCurrentStatus.isWriter ? (
          data?.marketPostResponse.status === "RECRUITING" ? (
            <>
              <BottomFixed.Button onClick={() => setRepostModal(true)}>
                끌어올리기
              </BottomFixed.Button>
              <BottomFixed.Button onClick={() => navigate("applicant")}>
                참여관리
              </BottomFixed.Button>
            </>
          ) : (
            <></>
          )
        ) : !data?.userCurrentStatus.isApplicant ? (
          <BottomFixed.Button
            color="orange"
            onClick={() => {
              setApplyModal(true);
            }}
          >
            신청하기
          </BottomFixed.Button>
        ) : (
          <BottomFixed.Button
            rounded={false}
            onClick={() => {
              setApplyModal(true);
            }}
          >
            신청 취소하기
          </BottomFixed.Button>
        )}
      </BottomFixed>
      {applyModal &&
        (!data?.userCurrentStatus.isApplicant ? (
          <Modal
            onClose={() => {
              setApplyModal(false);
              applyActivity();
            }}
          >
            <EmptyBox>
              <Modal.Title text="신청되었습니다" />
            </EmptyBox>
          </Modal>
        ) : (
          <Modal onClose={() => setApplyModal(false)}>
            <Modal.Title text="신청을\n취소하시겠습니까?" />
            <Modal.Button
              color="orange"
              onClick={() => {
                cancelActivity();
                setApplyModal(false);
              }}
            >
              취소하기
            </Modal.Button>
          </Modal>
        ))}
      {repostModal && (
        <Modal onClose={() => setRepostModal(false)}>
          <Modal.Title text="게시물을\n끌어올릴까요?" />
          <p>
            끌어올릴 시 전체 게시물
            <br />
            상단으로 올라갑니다
          </p>
          <Modal.Button
            color="orange"
            onClick={() => {
              setRepostModal(false);
              pullUp();
            }}
          >
            끌어올리기
          </Modal.Button>
        </Modal>
      )}
      {data?.userCurrentStatus.isWriter && statusModal && (
        <Modal onClose={() => setStatusModal(false)}>
          <Modal.Title text="모집을\n끝내시겠습니까?" />

          <Modal.Button
            color="orange"
            onClick={() => {
              setStatusModal(false);
              // TODO: 모집 상태 변경 api
            }}
          >
            모집종료
          </Modal.Button>
        </Modal>
      )}
    </DefaultLayout>
  );
};

const StyledButton = styled.button`
  width: 1.67rem;
  height: 1.78rem;
  align-items: center;
  justify-content: center;
  border: 0;
  background-color: transparent;
`;

const BackButtonSVG = styled.img`
  width: 0.56rem;
  height: 0.56rem;
`;

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

const ButtonWrapper = styled.div`
  float: right;
`;

const EmptyBox = styled.div`
  padding: 10px;
`;

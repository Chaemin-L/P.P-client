import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";

import { PostType } from "@/api/types/post-type";
import BackBlackSVG from "@/assets/icons/back-black.svg";
import { ActivityBox } from "@/components/common/activity-box";
import { AppBar } from "@/components/common/app-bar";
import { BottomFixed } from "@/components/common/bottom-fixed";
import { BottomSheet } from "@/components/common/bottom-sheet";
import { Button } from "@/components/common/button";
import { Modal } from "@/components/common/modal";
import { DefaultLayout } from "@/components/layout/default-layout";
import { Report } from "@/components/report/report";
import { useCheckChatMakePost } from "@/hooks/chat/useCheckChatMakePost";
import { useDeleteApply } from "@/hooks/queries/useDeleteApply";
import { useDeletePost } from "@/hooks/queries/useDeletePost";
import { useGetPostDetail } from "@/hooks/queries/useGetPostDetail";
import { useGetProfile } from "@/hooks/queries/useGetProfile";
import { usePostApply } from "@/hooks/queries/usePostApply";
import { usePullUp } from "@/hooks/queries/usePullUp";
import { postState } from "@/recoil/atoms/post-state";
import { colorTheme } from "@/style/color-theme";

export const PostDetailPage = () => {
  const { postId } = useParams();
  const { data: profile } = useGetProfile();

  const [editModal, setEditModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false); // TODO: remove this
  const [deleteModal, setDeleteModal] = useState(false);
  const [statusModal, setStatusModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [repostModal, setRepostModal] = useState(false);
  const [reportBottomSheet, setReportBottomSheet] = useState(false);

  const [applyModal, setApplyModal] = useState<boolean>(false);

  const { data } = useGetPostDetail(postId!);
  const chatData = useCheckChatMakePost(postId!);
  const setPost = useSetRecoilState(postState);
  const { mutate: deletePost } = useDeletePost(postId!);
  const { mutate: applyActivity } = usePostApply(postId!);
  const { mutate: cancelActivity } = useDeleteApply(postId!);
  const { mutate: pullUp } = usePullUp(postId!);
  // deprecated
  // const { mutate: changeStatus } = useChangeStatus(postId!);

  const navigate = useNavigate();

  useEffect(() => {
    if (data) setPost(data);
  }, [data]);

  return (
    <DefaultLayout
      scrollbar
      appbar={
        <AppBar>
          <AppBar.AppBarNavigate>
            <StyledButton onClick={() => navigate("/post")}>
              <BackButtonSVG src={BackBlackSVG} />
            </StyledButton>
          </AppBar.AppBarNavigate>
        </AppBar>
      }
    >
      <PaddingWrapper $isWriter={data?.userCurrentStatus.isWriter ?? false}>
        {data?.marketPostResponse.status === "RECRUITING" ? (
          data?.userCurrentStatus.isWriter ? (
            <JustifyWrapper>
              <Button
                color="orange"
                onClick={() => {
                  setErrorModal(true);
                }}
              >
                모집완료
              </Button>
              <Button
                color="orange"
                onClick={() => {
                  setEditModal(true);
                }}
              >
                편집하기
              </Button>
            </JustifyWrapper>
          ) : (
            <></>
          )
        ) : (
          <DoneWrapper>모집완료</DoneWrapper>
        )}
        <ActivityBox data={{ ...data?.marketPostResponse } as PostType} />
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

        {/** Bottom sheet */}
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
            creatorId={"35"}
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

        {/** BottomFixed Buttons */}
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
              <>
                <BottomFixed.Button
                  onClick={() => {
                    if (chatData !== null) {
                      navigate(`/chat/detail`, {
                        state: {
                          roomId: chatData.roomId,
                          postId: chatData.postId,
                          memberCount: chatData.memberCount,
                          creatorId: chatData.creatorId,
                        },
                      });
                    }
                  }}
                >
                  채팅방으로 가기
                </BottomFixed.Button>
                {data?.marketPostResponse.status ===
                  "RECRUITMENT_COMPLETED" && (
                  <BottomFixed.Button onClick={() => navigate("applicant")}>
                    참여관리
                  </BottomFixed.Button>
                )}
              </>
            )
          ) : data?.marketPostResponse.status === "RECRUITING" ? (
            !data?.userCurrentStatus.isApplicant ? (
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
            )
          ) : (
            <></>
          )}
        </BottomFixed>

        {/** Modal */}
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
                  if (profile)
                    cancelActivity({
                      applyId: data.userCurrentStatus.applyId,
                      userId: profile?.userId,
                    });
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
        {statusModal && (
          <Modal onClose={() => setStatusModal(false)}>
            <Modal.Title text="모집을\n끝내시겠습니까?" />

            <Modal.Button color="orange">모집종료</Modal.Button>
          </Modal>
        )}
        {editModal && (
          <Modal onClose={() => setEditModal(false)}>
            <Modal.Title text="편집하시겠습니까?" />
            <EditModalButtonWrapper>
              <Modal.Button
                color="orange"
                onClick={() => {
                  if (data && data?.marketPostResponse.currentApplicant > 0) {
                    setErrorModal(true); // temp
                  } else {
                    navigate("edit");
                  }
                  setEditModal(false);
                  setErrorModal(true);
                }}
              >
                수정하기
              </Modal.Button>
              <Modal.Button
                onClick={() => {
                  setEditModal(false);
                  setDeleteModal(true);
                }}
              >
                삭제하기
              </Modal.Button>
            </EditModalButtonWrapper>
          </Modal>
        )}
        {deleteModal && (
          <Modal
            onClose={() => {
              setDeleteModal(false);
              deletePost();
            }}
          >
            <Modal.Title text="게시물이\n삭제되었습니다" />
          </Modal>
        )}
        {errorModal && (
          <Modal
            onClose={() => {
              setErrorModal(false);
            }}
          >
            <Modal.Title text="아직 지원하지 않는 \n 서비스입니다." />
          </Modal>
        )}
      </PaddingWrapper>
    </DefaultLayout>
  );
};

const PaddingWrapper = styled.div<{ $isWriter: boolean }>`
  position: relative;
  display: flex;
  width: 100%;
  height: auto;
  min-height: 100%;
  padding: ${({ $isWriter }) =>
    $isWriter ? "0 1.6rem 120px" : "0 1.6rem 6rem"};
  flex-direction: column;
`;

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
  width: 120%;
  position: relative;
  right: 10%;
  padding: 25px;
  margin-bottom: 20px;
  background-color: ${colorTheme.blue100};
  color: white;
  font-size: 1.3rem;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const EmptyBox = styled.div`
  padding: 10px;
`;

const EditModalButtonWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.78rem;
`;

import { useNavigate } from "react-router-dom";

import { ApplicantOnlyDeleteProps } from "./type";

import { Modal } from "@/components/common/modal";
import { usePostApplyAccept } from "@/hooks/queries/usePostApplyAccept";

export const ApplicantOnlyDelete = ({
  applyIds,
  postId,
  setApplyModal,
  setStatusChangeModal,
  isPage = false,
  onFinishApply,
}: ApplicantOnlyDeleteProps) => {
  const { mutate: accept } = usePostApplyAccept(postId);
  const navigate = useNavigate();

  return (
    <Modal
      onClose={() => {
        setStatusChangeModal(false);
      }}
    >
      {applyIds.length === 0 && (
        <Modal.Title text="선택한 유저를 \n 참여자에서 제외시켰습니다 \n 이 게시물의 현재 상태는 \n [모집중]입니다." />
      )}
      {applyIds.length !== 0 && (
        <Modal.Title text="선택한 유저를 \n 참여자에서 제외시켰습니다 \n 이 게시물의 현재 상태는 \n [모집중]입니다. \n 상태를 [모집완료]로 \n 변경하시겠습니까?" />
      )}
      {applyIds.length === 0 ? (
        isPage ? (
          <>
            <Modal.Button
              color="orange"
              onClick={() => {
                navigate(-1);
              }}
            >
              게시글 돌아가기
            </Modal.Button>
            <Modal.Button
              color="orange"
              onClick={() => {
                navigate("/post");
              }}
            >
              홈화면 가기
            </Modal.Button>
          </>
        ) : (
          <>
            <Modal.Button
              color="orange"
              onClick={() => {
                if (onFinishApply) onFinishApply();
              }}
            >
              채팅방 돌아가기
            </Modal.Button>
            <Modal.Button
              color="orange"
              onClick={() => {
                navigate("/post");
              }}
            >
              홈화면 가기
            </Modal.Button>
          </>
        )
      ) : (
        <>
          <Modal.Button
            onClick={() => {
              const tempAcceptList: number[] = applyIds.map((item) => {
                return item.applyId;
              });
              accept(tempAcceptList, {
                onSuccess: () => {
                  setApplyModal("Finish");
                  setStatusChangeModal(false);
                },
              });
            }}
          >
            {"[모집완료]로 변경"}
          </Modal.Button>
          <Modal.Button
            onClick={() => {
              setApplyModal("KeepStatus");
              setStatusChangeModal(false);
            }}
          >
            {"[모집중] 유지"}
          </Modal.Button>
        </>
      )}
    </Modal>
  );
};

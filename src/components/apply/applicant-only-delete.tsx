import { ApplicantOnlyDeleteProps } from "./type";

import { Modal } from "@/components/common/modal";
import { usePostApplyAccept } from "@/hooks/queries/usePostApplyAccept";

export const ApplicantOnlyDelete = ({
  applyIds,
  postId,
  setApplyModal,
  setStatusChangeModal,
}: ApplicantOnlyDeleteProps) => {
  const { mutate: accept } = usePostApplyAccept(postId);

  return (
    <Modal
      onClose={() => {
        setStatusChangeModal(false);
      }}
    >
      <Modal.Title text="선택한 유저를 참여자에서 제외시켰습니다 \n 이 게시물의 현재 상태는 [모집중]입니다. \n 상태를 [모집완료]로 변경하시겠습니까?" />
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
    </Modal>
  );
};

import { ApplicantModifyModalProps, ApplyListType } from "./type";

import { Modal } from "@/components/common/modal";
import { useDeleteApply } from "@/hooks/queries/useDeleteApply";
import { usePostApplyAccept } from "@/hooks/queries/usePostApplyAccept";
import { usePostRollback } from "@/hooks/queries/usePostRollback";
import { usePutChatNewMember } from "@/hooks/queries/usePutChatNewMember";

const newMember = ({ a, b }: { a: ApplyListType[]; b: ApplyListType[] }) => {
  a.sort();
  b.sort();
  return a.filter((x) => !b.includes(x));
};

export const ApplicantModifyModal = ({
  setIsApplyChangeCheck,
  applyIds,
  originApplyIds,
  postId,
  chatRoomId,
  isPage = false,
  setApplyModal,
  setChatMakeRoomId,
  setStatusChangeModal,
  setIsApplyError,
}: ApplicantModifyModalProps) => {
  const { mutate: postRollback } = usePostRollback();
  const { mutate: putNewMember } = usePutChatNewMember();
  const { mutate: deleteApply } = useDeleteApply(postId);
  const { mutate: accept } = usePostApplyAccept(postId);

  const newMemberList = newMember({
    a: applyIds,
    b: originApplyIds,
  });
  const deleteMemberList = newMember({
    a: originApplyIds,
    b: applyIds,
  });

  return (
    <Modal
      onClose={() => {
        setIsApplyChangeCheck(false);
      }}
    >
      {deleteMemberList.length > 0 && newMemberList.length === 0 ? (
        <Modal.Title text="정말 선택한 유저를 \n 참여자에서 제외하시겠습니까?" />
      ) : (
        <Modal.Title text="정말 참여자를 바꾸겠습니까?" />
      )}
      <Modal.Button
        onClick={() => {
          postRollback(postId, {
            onSuccess: () => {
              if (deleteMemberList.length > 0) {
                deleteMemberList.map((item) => {
                  deleteApply(item);
                });
              }

              const tempList: string[] = applyIds.map((id) => {
                return id.userId.toString();
              });
              const tempData = {
                chatRoomId: chatRoomId,
                addingData: {
                  postId: Number(postId),
                  memberIds: tempList,
                },
              };

              if (newMemberList.length === 0) {
                putNewMember(tempData, {
                  onSuccess: (res) => {
                    if (setApplyModal) {
                      setStatusChangeModal(true);
                      if (isPage && setChatMakeRoomId) {
                        setChatMakeRoomId(res);
                      }
                      setIsApplyChangeCheck(false);
                    }
                  },
                  onError: () => {
                    setIsApplyError("APPLY_CHAT_ERROR");
                  },
                });
              } else {
                console.log("accept modify modal");
                const tempAcceptList: number[] = applyIds.map((item) => {
                  return item.applyId;
                });
                accept(tempAcceptList, {
                  onSuccess: () => {
                    putNewMember(tempData, {
                      onSuccess: (res) => {
                        if (setApplyModal) {
                          setApplyModal("ChangeNewMember");
                          if (isPage && setChatMakeRoomId) {
                            setChatMakeRoomId(res);
                            setIsApplyChangeCheck(false);
                          }
                        }
                      },
                      onError: () => {
                        setIsApplyError("APPLY_CHAT_ERROR");
                        setIsApplyChangeCheck(false);
                      },
                    });
                  },
                  onError: () => {
                    if (setApplyModal) {
                      setIsApplyError("APPLY_ID_LENGTH_OVER");
                      setIsApplyChangeCheck(false);
                    }
                  },
                });
              }
            },
          });
        }}
      >
        참여자 변경
      </Modal.Button>
    </Modal>
  );
};

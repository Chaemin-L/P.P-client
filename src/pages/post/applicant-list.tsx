import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ChatMakeRequest, ChatMakeRoom } from "@/api/types/chat-type";
import { ApplicantItemList } from "@/components/apply/applicant-item-list";
import { ApplicantModifyModal } from "@/components/apply/applicant-modify-modal";
import { ApplicantOnlyDelete } from "@/components/apply/applicant-only-delete";
import { ApplyListType } from "@/components/apply/type";
import { BottomFixed } from "@/components/common/bottom-fixed";
import { Modal } from "@/components/common/modal";
import { useCheckChatMake } from "@/hooks/chat/useCheckChatMake";
import { useChangeStatus } from "@/hooks/queries/useChangeStatus";
import { useGetApplyList } from "@/hooks/queries/useGetApplyList";
import { useGetPostDetail } from "@/hooks/queries/useGetPostDetail";
import { usePostApplyAccept } from "@/hooks/queries/usePostApplyAccept";
import { usePostMakeChat } from "@/hooks/queries/usePostMakeChat";
import { checkChange } from "@/utils/apply-list-change-check";

export const ApplicantList = ({ postId }: { postId: string }) => {
  const [applyModal, setApplyModal] = useState<string>("");
  const [originApplyIds, setOriginApplyIds] = useState<ApplyListType[]>([]);
  const [applyIds, setApplyIds] = useState<ApplyListType[]>([]);

  const { data } = useGetApplyList(postId);
  const { mutate: accept } = usePostApplyAccept(postId);
  const { data: postData } = useGetPostDetail(postId);

  const { mutate: makeChat } = usePostMakeChat();
  const chatRoomId = useCheckChatMake(postId);
  const [chatMakeRoomId, setChatMakeRoomId] = useState<ChatMakeRoom | null>(
    null,
  );
  const navigate = useNavigate();

  const [isApplyError, setIsApplyError] = useState("");
  const [isApplyChangeCheck, setIsApplyChangeCheck] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isStatusChange, setIsStatusChange] = useState(false);

  const isRecruiting = postData
    ? postData.marketPostResponse.status === "RECRUITING"
      ? true
      : false
    : false;

  useEffect(() => {
    if (data && !isDataLoaded) {
      const tempApplyIds: ApplyListType[] = [];
      data?.map((item) => {
        if (item.status !== "WAITING") {
          tempApplyIds.push({
            applyId: item.applyId,
            userId: item.applicantInfo.userId,
          });
        }
      });
      setApplyIds(tempApplyIds);
      setOriginApplyIds(tempApplyIds);
      console.log("OriginApplyIds: ", tempApplyIds);
      const timeoutId = setTimeout(() => {
        setIsDataLoaded(true);
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [data, isDataLoaded]);

  const GoToChatRoom = () => {
    const myId = localStorage.getItem("userId");
    if (chatMakeRoomId !== null && myId !== null) {
      navigate(`/chat/detail`, {
        state: {
          roomId: chatMakeRoomId.roomId,
          postId: chatMakeRoomId.postId,
          memberCount: chatMakeRoomId.memberCount,
          creatorId: myId,
        },
      });
    }
  };

  return (
    <>
      <ApplicantItemList
        data={data!}
        applyIds={applyIds}
        setApplyIds={setApplyIds}
        isRecruiting={isRecruiting}
        originApplyIds={originApplyIds}
        setApplyModal={setApplyModal}
      />
      <BottomFixed>
        <BottomFixed.Button
          color="orange"
          onClick={() => {
            const tempAcceptList: number[] = applyIds.map((item) => {
              return item.applyId;
            });
            if (isRecruiting) {
              if (applyIds.length === 0) {
                setIsApplyError("APPLY_ID_LENGTH_ZERO");
              } else {
                accept(tempAcceptList, {
                  onSuccess: () => {
                    const tempList: string[] = applyIds.map((id) => {
                      return id.userId.toString();
                    });
                    const tempData: ChatMakeRequest = {
                      postId: Number(postId),
                      memberIds: tempList,
                    };
                    if (chatRoomId === "") {
                      makeChat(tempData, {
                        onSuccess: (res) => {
                          setApplyModal("PostNewMember");
                          setChatMakeRoomId(res);
                          console.log("makeChat: ", res);
                        },
                      });
                    }
                  },
                  onError: () => {
                    setIsApplyError("APPLY_ID_LENGTH_OVER");
                  },
                });
              }
            } else {
              if (checkChange({ a: originApplyIds, b: applyIds })) {
                if (applyIds.length === 0) {
                  setIsApplyError("APPLY_ID_LENGTH_ZERO");
                } else {
                  setIsApplyError("APPLY_ID_NOT_CHANGE");
                }
              } else {
                if (originApplyIds.length > 0) {
                  setIsApplyChangeCheck(true);
                }
              }
            }
          }}
        >
          {applyIds.length}명 수락하기
        </BottomFixed.Button>
      </BottomFixed>
      {applyModal !== "" && (
        <Modal
          onClose={() => {
            setApplyModal("");
          }}
        >
          {(applyModal === "PostNewMember" ||
            applyModal === "ChangeNewMember") && (
            <Modal.Title text="신청 수락 완료" />
          )}
          {applyModal === "Finish" && (
            <Modal.Title text="이 게시물은 [모집완료] 상태가 되었습니다" />
          )}
          {applyModal === "KeepStatus" && (
            <Modal.Title text="이 게시물은 [모집중] 상태가 되었습니다" />
          )}
          <Modal.Button
            color="orange"
            onClick={() => {
              GoToChatRoom();
            }}
          >
            채팅방 가기
          </Modal.Button>
          <Modal.Button
            color="orange"
            onClick={() => {
              navigate("/post");
            }}
          >
            홈화면 가기
          </Modal.Button>
        </Modal>
      )}
      {isApplyError !== "" && (
        <Modal onClose={() => setIsApplyError("")}>
          {isApplyError === "APPLY_ID_LENGTH_ZERO" && (
            <Modal.Title text="수락할 지원자 선택 후 \n 수락해주세요" />
          )}
          {isApplyError === "APPLY_ID_LENGTH_OVER" && (
            <Modal.Title text="최대 신청자 수를 넘겼습니다" />
          )}
          {isApplyError === "APPLY_ID_NOT_CHANGE" && (
            <Modal.Title text="변경 사항이 없습니다." />
          )}
        </Modal>
      )}
      {isApplyChangeCheck && (
        <ApplicantModifyModal
          setIsApplyChangeCheck={setIsApplyChangeCheck}
          applyIds={applyIds}
          originApplyIds={originApplyIds}
          postId={postId}
          chatRoomId={chatRoomId}
          isPage={true}
          setChatMakeRoomId={setChatMakeRoomId}
          setApplyModal={setApplyModal}
          setStatusChangeModal={setIsStatusChange}
          setIsApplyError={setIsApplyError}
        />
      )}
      {isStatusChange && (
        <ApplicantOnlyDelete
          applyIds={applyIds}
          postId={postId}
          setApplyModal={setApplyModal}
          setStatusChangeModal={setIsApplyChangeCheck}
        />
      )}
    </>
  );
};

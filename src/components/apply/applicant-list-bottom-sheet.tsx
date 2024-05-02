import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ApplicantItemList } from "./applicant-item-list";
import { ApplicantModifyModal } from "./applicant-modify-modal";
import { ApplicantOnlyDelete } from "./applicant-only-delete";
import { ApplicantListBottomSheetProps, ApplyListType } from "./type";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { Modal } from "@/components/common/modal";
import { useGetApplyList } from "@/hooks/queries/useGetApplyList";
import { useGetPostDetail } from "@/hooks/queries/useGetPostDetail";
import { checkChange } from "@/utils/apply-list-change-check";

export const ApplicantListBottomSheet = ({
  postId,
  chatId,
  onFinishApply,
}: ApplicantListBottomSheetProps) => {
  const [originApplyIds, setOriginApplyIds] = useState<ApplyListType[]>([]);
  const [applyIds, setApplyIds] = useState<ApplyListType[]>([]);

  const [isApplyError, setIsApplyError] = useState("");
  const [isApplyChangeCheck, setIsApplyChangeCheck] = useState(false);
  const [applyModal, setApplyModal] = useState<string>("");
  const [isStatusChange, setIsStatusChange] = useState(false);

  const { data } = useGetApplyList(postId);
  const { data: postData } = useGetPostDetail(postId);

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const navigate = useNavigate();

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

  return (
    <div style={{ height: "100%", width: "100%" }}>
      {isDataLoaded && (
        <ApplicantItemList
          data={data!}
          applyIds={applyIds}
          setApplyIds={setApplyIds}
          isRecruiting={isRecruiting}
          originApplyIds={originApplyIds}
          setApplyModal={setApplyModal}
        />
      )}
      <BottomFixed>
        <BottomFixed.Button
          color="orange"
          onClick={() => {
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
          }}
        >
          {applyIds.length}명 수락하기
        </BottomFixed.Button>
      </BottomFixed>
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
          {isApplyError === "IMPOSSIBLE_SELECT_APPLY" && (
            <Modal.Title text="[모집중] 상태에서는 \n 기존의 참여자를 \n 제외시킬 수 없습니다." />
          )}
        </Modal>
      )}
      {isApplyChangeCheck && (
        <ApplicantModifyModal
          setIsApplyChangeCheck={setIsApplyChangeCheck}
          applyIds={applyIds}
          originApplyIds={originApplyIds}
          postId={postId}
          chatRoomId={chatId}
          setApplyModal={setApplyModal}
          setStatusChangeModal={setIsStatusChange}
          setIsApplyError={setIsApplyError}
        />
      )}
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
            onClick={() => {
              onFinishApply();
            }}
          >
            확인
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
      {isStatusChange && (
        <ApplicantOnlyDelete
          applyIds={applyIds}
          postId={postId}
          setApplyModal={setApplyModal}
          setStatusChangeModal={setIsApplyChangeCheck}
        />
      )}
    </div>
  );
};

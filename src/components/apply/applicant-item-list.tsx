import { ApplicantItem } from "./applicant-item";
import { ApplicantItemProps } from "./type";

export const ApplicantItemList = ({
  data,
  applyIds,
  setApplyIds,
  isRecruiting,
  originApplyIds,
  setApplyModal,
}: ApplicantItemProps) => {
  return (
    <>
      {data?.map((applicant) => {
        <ApplicantItem
          key={applicant.applyId}
          {...applicant}
          selected={applyIds.some(
            (item) =>
              item.applyId === applicant.applyId &&
              item.userId === applicant.applicantInfo.userId,
          )}
          onSelect={() => {
            const id = applicant.applyId;
            const userId = applicant.applicantInfo.userId;
            if (
              isRecruiting &&
              originApplyIds.some(
                (item) =>
                  item.applyId === applicant.applyId &&
                  item.userId === applicant.applicantInfo.userId,
              )
            ) {
              setApplyModal("IMPOSSIBLE_SELECT_APPLY");
            } else {
              if (
                applyIds.some(
                  (item) =>
                    item.applyId === applicant.applyId &&
                    item.userId === applicant.applicantInfo.userId,
                )
              ) {
                setApplyIds((prev) => prev.filter((p) => p.applyId !== id));
              } else {
                setApplyIds((prev) => [
                  ...prev,
                  { applyId: id, userId: userId },
                ]);
              }
            }
          }}
        />;
      })}
    </>
  );
};

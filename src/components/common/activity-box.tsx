import { PropsWithChildren } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import { activityState } from "@/recoil/atoms/activity-state";

export const ActivityBox = ({ children }: PropsWithChildren) => {
  return <>{children}</>;
};

const Title = () => {
  const { readOnly } = useRecoilValue(activityState);

  return (
    <div>
      <input type="text" placeholder="활동 이름" disabled={readOnly} />
    </div>
  );
};

const ProfileImage = () => {
  const { readOnly } = useRecoilValue(activityState);

  return (
    <>
      <input type="file" disabled={readOnly} />
    </>
  );
};

const Time = () => {
  const { readOnly } = useRecoilValue(activityState);

  return (
    <>
      <select disabled={readOnly}>
        <option>시간</option>
        <option>오전</option>
        <option>오후</option>
        <option>무관</option>
      </select>
    </>
  );
};

const Date = () => {
  const { readOnly } = useRecoilValue(activityState);

  return (
    <>
      <input type="date" disabled={readOnly}></input>
    </>
  );
};

const Location = () => {
  const { readOnly } = useRecoilValue(activityState);

  return (
    <>
      <input type="text" placeholder="활동 장소" disabled={readOnly} />
    </>
  );
};

const Description = () => {
  const { readOnly } = useRecoilValue(activityState);

  return (
    <>
      <textarea placeholder="활동 설명" rows={5} disabled={readOnly} />
    </>
  );
};

const MemberNum = () => {
  const { memberNum } = useRecoilValue(activityState);

  return (
    <>
      <span>{memberNum.length ? memberNum : "1 / 3"}</span>
    </>
  );
};

/** buttons */
const CompleteButton = () => {
  const [_, setActivity] = useRecoilState(activityState);

  return (
    <>
      <button
        onClick={() =>
          setActivity((activity) => ({ ...activity, readOnly: true }))
        }
      >
        모집완료
      </button>
    </>
  );
};

const EditButton = () => {
  const [_, setActivity] = useRecoilState(activityState);

  return (
    <>
      <button
        onClick={() =>
          setActivity((activity) => ({
            ...activity,
            readOnly: !activity.readOnly,
          }))
        }
      >
        수정하기
      </button>
    </>
  );
};

ActivityBox.Title = Title;
ActivityBox.ProfileImage = ProfileImage;
ActivityBox.Time = Time;
ActivityBox.Date = Date;
ActivityBox.Location = Location;
ActivityBox.Description = Description;
ActivityBox.MemberNum = MemberNum;

ActivityBox.EditButton = EditButton;
ActivityBox.CompleteButton = CompleteButton;

import { createContext, PropsWithChildren, useState } from "react";

import { ActivityBoxContextType, TimeType } from "./type";

import { useActivityBox } from "@/hooks/useActivityBox";

export const ActivityBoxContext = createContext<
  ActivityBoxContextType | undefined
>(undefined);

export const ActivityBox = ({ children }: PropsWithChildren) => {
  // 추후에 전역 상태로 관리할 예정
  const [title, setTitle] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string>("");
  const [time, setTime] = useState<TimeType | null>(null);
  const [date, setDate] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [memberNum] = useState<string>("1 / 3"); // TODO: api 내부에서 제한 인원 수와 실제 지원자 수를 활용하여 하나의 string으로 가공
  const [readOnly, setReadOnly] = useState<boolean>(true);

  return (
    <ActivityBoxContext.Provider
      value={{
        title,
        setTitle,
        profileImage,
        setProfileImage,
        time,
        setTime,
        date,
        setDate,
        location,
        setLocation,
        memberNum,
        readOnly,
        setReadOnly,
      }}
    >
      {children}
    </ActivityBoxContext.Provider>
  );
};

const Title = () => {
  const { readOnly } = useActivityBox();

  return (
    <div>
      <input type="text" placeholder="활동 이름" disabled={readOnly} />
    </div>
  );
};

const ProfileImage = () => {
  const { readOnly } = useActivityBox();

  return (
    <>
      <input type="file" disabled={readOnly} />
    </>
  );
};

const Time = () => {
  const { readOnly } = useActivityBox();

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
  const { readOnly } = useActivityBox();
  return (
    <>
      <input type="date" disabled={readOnly}></input>
    </>
  );
};

const Location = () => {
  const { readOnly } = useActivityBox();

  return (
    <>
      <input type="text" placeholder="활동 장소" disabled={readOnly} />
    </>
  );
};

const Description = () => {
  const { readOnly } = useActivityBox();

  return (
    <>
      <textarea placeholder="활동 설명" rows={5} disabled={readOnly} />
    </>
  );
};

const MemberNum = () => {
  const { memberNum } = useActivityBox();

  return (
    <>
      <span>{memberNum}</span>
    </>
  );
};

/** buttons */
const CompleteButton = () => {
  const { setReadOnly } = useActivityBox();
  return (
    <>
      <button onClick={() => setReadOnly(true)}>모집완료</button>
    </>
  );
};

const EditButton = () => {
  const { setReadOnly } = useActivityBox();
  return (
    <>
      <button onClick={() => setReadOnly((prev) => !prev)}>수정하기</button>
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

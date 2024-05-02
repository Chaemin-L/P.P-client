import { useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { PostType, StatusType } from "@/api/types/post-type";
import ApplicantSVG from "@/assets/icons/applicant.svg";
import DateSVG from "@/assets/icons/date.svg";
import KnotSVG from "@/assets/icons/knot.svg";
import LocationSVG from "@/assets/icons/location.svg";
import TimeSVG from "@/assets/icons/time.svg";
import { postEditState } from "@/recoil/atoms/post-edit-state";
import { colorTheme } from "@/style/color-theme";
import { BackdateToItemtype } from "@/utils/backdate-to-itemtype";

type ActivityBoxType = {
  data: PostType;
  editMode?: boolean;
};
export const ActivityBox = ({ data, editMode = false }: ActivityBoxType) => {
  const titleInputRef = useRef<HTMLInputElement>(null);

  const [ePost, setEPost] = useRecoilState(postEditState);

  useEffect(() => {
    if (data && editMode)
      setEPost({
        title: data.title,
        content: data.content,
        startDate: data.startDate,
        location: data.location,
        maxNumOfPeople: data.maxNumOfPeople,
        volunteerTime: data.volunteerTime,
      });
  }, [data]);

  useEffect(() => {
    if (editMode && titleInputRef.current) titleInputRef.current.focus();
  }, []);
  return (
    <>
      <Progress>
        <Status $status={data.status}>
          {data.status === "RECRUITING" ? "모집중" : "모집완료"}
        </Status>
        <HeadCount>
          {data.currentApplicant}/{data.maxNumOfPeople}명
        </HeadCount>
        <KnotPay>{data.pay} 매듭</KnotPay>
      </Progress>

      <PostInfo>
        {!editMode ? (
          <>
            <Title>{data.title}</Title>
            <Content>{data.content}</Content>
          </>
        ) : (
          <>
            <TitleInput
              ref={titleInputRef}
              defaultValue={data.title}
              maxLength={20}
              onChange={(e) =>
                setEPost((prev) => ({ ...prev, title: e.target.value }))
              }
            />
            <ContentTextarea
              rows={5}
              defaultValue={data.content}
              maxLength={100}
              onChange={(e) =>
                setEPost((prev) => ({ ...prev, content: e.target.value }))
              }
            />
            <CharacterCount>{ePost.content.length}/100</CharacterCount>
          </>
        )}
      </PostInfo>

      <MoreInfoContainer>
        <PromiseInfoList>
          <PromiseInfoItem $icon={DateSVG}>
            <span>{BackdateToItemtype(data.startDate)}</span>
          </PromiseInfoItem>
          <PromiseInfoItem $icon={LocationSVG}>
            <span>{data.location}</span>
          </PromiseInfoItem>
          <PromiseInfoItem $icon={TimeSVG}>
            <span>예상 소요 시간 {data.volunteerTime}분</span>
          </PromiseInfoItem>
        </PromiseInfoList>

        <span>조회수 {data.viewsCount}회</span>
      </MoreInfoContainer>
    </>
  );
};

const Progress = styled.div`
  display: flex;
  padding: 15px;
  border-radius: 20px;
  background-color: #e4e8f1;
  justify-content: space-between;
`;

const Status = styled.div<{ $status: StatusType }>`
  width: fit-content;
  padding: 6px 11px;
  border-radius: 11px;
  background-color: ${colorTheme.orange400};
  color: white;
  font-size: 0.83rem;

  ${({ $status }) =>
    $status == "RECRUITMENT_COMPLETED" &&
    `background: transparent; color: ${colorTheme.blue500};`}
`;

const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  margin-top: 10px;
  padding: 20px;
  background-color: #e4e8f1;
  border-radius: 20px;
  color: black;
`;

const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 700;
`;

const TitleInput = styled.input`
  background-color: transparent;
  border: 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: ${colorTheme.orange400};
`;

const Content = styled.p`
  line-height: 140%;
  white-space: pre-line;
`;

const ContentTextarea = styled.textarea`
  background-color: transparent;
  border: 0;
  line-height: 120%;
  color: ${colorTheme.orange400};
`;

const CharacterCount = styled.div`
  text-align: right;
`;

const HeadCount = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  &::before {
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 1px;
    background-image: url(${ApplicantSVG});
    content: " ";
  }
`;

const KnotPay = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  &::before {
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 1px;
    background-image: url(${KnotSVG});
    content: " ";
  }
`;

const MoreInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  padding: 24px 22px 45px;
`;

const PromiseInfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

const PromiseInfoItem = styled.div<{ $icon: string }>`
  display: flex;
  align-items: center;
  gap: 11px;
  &::before {
    width: 20px;
    height: 20px;
    border-radius: 1px;
    background-image: url(${({ $icon }) => $icon});
    background-position: center;
    background-repeat: no-repeat;
    content: " ";
  }
`;

import { styled } from "styled-components";

import { PostType, StatusType } from "@/api/types/post-type";
import ApplicantSVG from "@/assets/icons/applicant.svg";
import DateSVG from "@/assets/icons/date.svg";
import KnotSVG from "@/assets/icons/knot.svg";
import LocationSVG from "@/assets/icons/location.svg";
import TimeSVG from "@/assets/icons/time.svg";
import { colorTheme } from "@/style/color-theme";

export const ActivityBox = (
  data: Omit<PostType, "startDate"> & { startDate: string[] },
) => {
  const {
    status,
    currentApplicant,
    maxNumOfPeople,
    pay,
    title,
    content,
    location,
    volunteerTime,
    startDate,
    viewsCount,
  } = data;

  return (
    <>
      <Progress>
        <Status $status={status}>
          {status === "RECRUITING" ? "모집중" : "모집완료"}
        </Status>
        <HeadCount>
          {currentApplicant}/{maxNumOfPeople}명
        </HeadCount>
        <KnotPay>{pay} 매듭</KnotPay>
      </Progress>

      <PostInfo>
        <Title>{title}</Title>
        <Content>{content}</Content>
      </PostInfo>

      <MoreInfoContainer>
        <PromiseInfoList>
          <PromiseInfoItem $icon={DateSVG}>
            <span>
              {startDate[0]}월 {startDate[1]}일{" "}
              {+startDate[2] > 12
                ? +startDate[2] === 0
                  ? `오전 12시`
                  : `오후 ${+startDate[2] - 12}`
                : startDate[2]}
              :{startDate[3]}
            </span>
          </PromiseInfoItem>
          <PromiseInfoItem $icon={LocationSVG}>
            <span>{location}</span>
          </PromiseInfoItem>
          <PromiseInfoItem $icon={TimeSVG}>
            <span>예상 소요 시간 {volunteerTime}분</span>
          </PromiseInfoItem>
        </PromiseInfoList>

        <span>조회수 {viewsCount}회</span>
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
  font-size: 15px;

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
  font-size: 30px;
  font-weight: 700;
`;

const Content = styled.p`
  line-height: 120%;
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

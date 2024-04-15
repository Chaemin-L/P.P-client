import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { CommonInput } from "@/components/common/common-input";
import { ToggleSwitch } from "@/components/common/toggle-switch";
import { PostingAppBar } from "@/components/posting/posting-app-bar";
import { PostingBoldText } from "@/components/posting/posting-bold-text";
import { PostingTimeInput } from "@/components/posting/posting-time-input";
import { postingState } from "@/recoil/atoms/posting-state";
import { colorTheme } from "@/style/color-theme";

export const Posting3 = () => {
  const navigate = useNavigate();
  const [posting, setPosting] = useRecoilState(postingState);
  const today = new Date();
  const hour = posting.startTimeSave ? posting.startDate.getHours() : -1;
  const [minuteValue, setMinuteValue] = useState(
    posting.startTimeSave ? posting.startDate.getMinutes().toString() : "",
  );
  const [isLeftSelected, SetIsLeftSelected] = useState(
    hour < 12 ? true : false,
  );
  const [hourValue, setHourValue] = useState(
    hour === -1
      ? ""
      : hour < 12
        ? hour === 0
          ? "12"
          : hour.toString()
        : hour - 12 === 0
          ? "12"
          : (hour - 12).toString(),
  );
  const [isHourError, setIsHourError] = useState(false);
  const [isMinuteError, setIsMinuteError] = useState(false);
  const [isAllError, setIsAllError] = useState(false);

  const handleSave = () => {
    let tempHour = 0;
    if (isLeftSelected) {
      tempHour = Number(hourValue) === 12 ? 0 : Number(hourValue);
    } else {
      tempHour = Number(hourValue) === 12 ? 12 : Number(hourValue) + 12;
    }
    posting.startDate.setHours(tempHour);
    posting.startDate.setMinutes(Number(minuteValue));
    setPosting((prevPosting) => {
      const updatedPosting = {
        ...prevPosting,
        startDate: posting.startDate,
        startTimeSave: true,
      };
      return updatedPosting;
    });
  };

  return (
    <PageContainer>
      <PostingAppBar onClick={() => handleSave()} nowPage={3} />
      <PostingBoldText>
        시작 시간을
        <br />
        선택해주세요
      </PostingBoldText>
      <ToggleSwitch
        firstText="오전"
        secondText="오후"
        isLeftSelected={isLeftSelected}
        onChangeSelected={SetIsLeftSelected}
      />
      <CommonInput style={{ paddingTop: "10%" }}>
        <CommonInput.InputInner
          value={hourValue}
          setValue={setHourValue}
          isError={isHourError}
          setIsError={setIsHourError}
          maximum={12}
          minimum={1}
        >
          시
        </CommonInput.InputInner>
        <CommonInput.InputInner
          value={minuteValue}
          setValue={setMinuteValue}
          isError={isMinuteError}
          setIsError={setIsMinuteError}
          maximum={59}
          minimum={0}
        >
          분
        </CommonInput.InputInner>
      </CommonInput>
      {isHourError && !isMinuteError && !isAllError && (
        <ErrorMsg>1~12시 사이로 입력해주세요!</ErrorMsg>
      )}
      {!isHourError && isMinuteError && !isAllError && (
        <ErrorMsg>0~59분 사이로 입력해주세요!</ErrorMsg>
      )}
      {isAllError && <ErrorMsg>정확한 시작 시간을 입력해주세요!</ErrorMsg>}
      <BottomFixed alignDirection="row">
        <BottomFixed.Button
          color="blue"
          onClick={() => {
            handleSave();
            navigate(-1);
          }}
        >
          이전
        </BottomFixed.Button>
        <BottomFixed.Button
          color="blue"
          onClick={() => {
            if (hourValue === "" || minuteValue === "") {
              setIsAllError(true);
              setIsHourError(true);
              setIsMinuteError(true);
            } else {
              handleSave();
              navigate("/posting/4");
            }
          }}
        >
          다음
        </BottomFixed.Button>
      </BottomFixed>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;

const ErrorMsg = styled.div`
  color: ${colorTheme.orange400};
  font-size: 1rem;
  text-align: center;
  font-weight: bold;
  line-height: 1.1rem;
`;

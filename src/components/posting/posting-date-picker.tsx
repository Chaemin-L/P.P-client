import { addMonths, format } from "date-fns";
import { ko } from "date-fns/locale/ko";
import DatePicker from "react-datepicker";
import { styled } from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

import { CustomHeaderProps, DatePickerProps } from "./type";

import BackGraySVG from "@/assets/icons/back-gray.svg";

export const PostingDatePicker = ({
  startDate,
  setStartDate,
}: DatePickerProps) => {
  return (
    <PickerContainer>
      <Picker>
        <DatePicker
          locale={ko}
          inline
          selected={startDate}
          onChange={(date: Date) => setStartDate(date)}
          minDate={new Date()}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
          }: CustomHeaderProps) => (
            <CustomHeader
              date={date}
              decreaseMonth={decreaseMonth}
              increaseMonth={increaseMonth}
            />
          )}
        />
      </Picker>
    </PickerContainer>
  );
};

const CustomHeader = ({
  date,
  decreaseMonth,
  increaseMonth,
}: CustomHeaderProps) => {
  const decreaseMonthWithValidation = () => {
    const today = new Date();
    if (date > today) decreaseMonth();
  };

  const previousMonthString = format(addMonths(date, -1), "LLLL", {
    locale: ko,
  });
  const nextMonthString = format(addMonths(date, 1), "LLLL", { locale: ko });

  return (
    <HeaderWrapper>
      <HeaderButton onClick={decreaseMonthWithValidation}>
        <ArrowImg src={BackGraySVG} />
        <HeaderButtonText>{previousMonthString}</HeaderButtonText>
      </HeaderButton>
      <HeaderNowMonth>
        {date.toLocaleString("default", { month: "long" })}
      </HeaderNowMonth>
      <HeaderButton onClick={increaseMonth}>
        <HeaderButtonText>{nextMonthString}</HeaderButtonText>
        <ArrowImg src={BackGraySVG} style={{ transform: "scaleX(-1)" }} />
      </HeaderButton>
    </HeaderWrapper>
  );
};

const PickerContainer = styled.div`
  width: 90%;
  padding-top: 90%;
  position: relative;
`;

const Picker = styled.div`
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  .react-datepicker {
    width: 100%;
    height: 100%;
    border: none;
    .react-datepicker__month-container {
      width: 100%;
      height: 100%;
      .react-datepicker__month {
        height: 70%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 2.8%;
        font-size: 0.89rem;
        .react-datepicker__week {
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .react-datepicker__header {
      width: 100%;
      height: 27%;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: none;
      font-size: 1rem;
    }
    .react-datepicker__day-names {
      margin: 3% 0 0 0;
      justify-content: space-between;
      display: flex;
      padding: 0 3.5%;
    }
    .react-datepicker__day-name {
      width: 1.78rem;
    }
    .react-datepicker__day--selected {
      background-color: #d9d9d9;
      font-size: 1rem;
      color: #000000;
    }
    .react-datepicker__day {
      width: 1.78rem;
      height: 1.33rem;
      line-height: 1.33rem;
      border-radius: 1.11rem;
    }
    .react-datepicker__day--keyboard-selected {
      background-color: transparent;
    }
  }
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 3%;
`;

const HeaderButton = styled.button`
  border: 0;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.33rem;
`;

const ArrowImg = styled.img`
  width: 0.67rem;
  height: 1.39rem;
`;

const HeaderButtonText = styled.span`
  font-size: 1.11rem;
  color: #a1a1a1;
`;

const HeaderNowMonth = styled.span`
  font-size: 1.39rem;
  color: #000000;
  padding-bottom: 0.28rem;
`;

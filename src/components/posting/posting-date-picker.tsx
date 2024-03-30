import { addMonths, startOfMonth, isBefore, Locale, format } from "date-fns";
import { ko } from "date-fns/locale/ko";
import DatePicker from "react-datepicker";
import { styled } from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

import { CustomHeaderProps, DatePickerProps } from "./type";

import backImg from "@/assets/images/back-img.png";

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
        <ArrowImg src={backImg} />
        <HeaderButtonText>{previousMonthString}</HeaderButtonText>
      </HeaderButton>
      <HeaderNowMonth>
        {date.toLocaleString("default", { month: "long" })}
      </HeaderNowMonth>
      <HeaderButton onClick={increaseMonth}>
        <HeaderButtonText>{nextMonthString}</HeaderButtonText>
        <ArrowImg src={backImg} style={{ transform: "scaleX(-1)" }} />
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
        font-size: 16px;
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
      font-size: 18px;
    }
    .react-datepicker__day-names {
      margin: 3% 0 0 0;
      justify-content: space-between;
      display: flex;
      padding: 0 3.5%;
    }
    .react-datepicker__day-name {
      width: 32px;
    }
    .react-datepicker__day--selected {
      background-color: #d9d9d9;
      font-size: 18px;
      color: #000000;
    }
    .react-datepicker__day {
      width: 32px;
      height: 24px;
      line-height: 24px;
      border-radius: 20px;
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
  gap: 6px;
`;

const ArrowImg = styled.img`
  width: 12px;
  height: 25px;
`;

const HeaderButtonText = styled.span`
  font-size: 20px;
  color: #a1a1a1;
`;

const HeaderNowMonth = styled.span`
  font-size: 25px;
  color: #000000;
  padding-bottom: 5px;
`;

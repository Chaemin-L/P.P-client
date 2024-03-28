import { addMonths, startOfMonth, isBefore, Locale, format } from "date-fns";
import { ko } from "date-fns/locale/ko";
import DatePicker from "react-datepicker";
import { styled } from "styled-components";
import "react-datepicker/dist/react-datepicker.css";

import { CustomHeaderProps, DatePickerProps } from "./type";

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
    const previousMonth = addMonths(date, -1);
    const startOfPreviousMonth = startOfMonth(previousMonth);
    const today = new Date();

    if (isBefore(startOfPreviousMonth, today)) {
      decreaseMonth();
    }
  };

  const previousMonthString = format(addMonths(date, -1), "LLLL", {
    locale: ko,
  });
  const nextMonthString = format(addMonths(date, 1), "LLLL", { locale: ko });

  return (
    <HeaderWrapper>
      <HeaderButton onClick={decreaseMonthWithValidation}>
        {"<"}
        {previousMonthString}
      </HeaderButton>
      <div>{date.toLocaleString("default", { month: "long" })}</div>{" "}
      <HeaderButton onClick={increaseMonth}>
        {nextMonthString}
        {">"}
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
    font-size: 18px;
    width: 100%;
    height: 100%;
    .react-datepicker__month-container {
      width: 100%;
      height: 100%;
      .react-datepicker__month {
        height: 70%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 2.8%;
        .react-datepicker__week {
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .react-datepicker__header {
      width: 100%;
      height: 25%;
      background-color: #ffffff;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .react-datepicker__day-names {
      margin: 3% 0 0 0;
      width: 100%;
      justify-content: space-between;
      display: flex;
      padding: 0 3.5%;
    }
  }
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 5%;
`;

const HeaderButton = styled.button`
  border: 0;
  background-color: #fff;
`;

export type CustomHeaderProps = {
  date: Date;
  decreaseMonth: () => void;
  increaseMonth: () => void;
};

export type DatePickerProps = {
  startDate: Date;
  setStartDate: (value: React.SetStateAction<Date>) => void;
};

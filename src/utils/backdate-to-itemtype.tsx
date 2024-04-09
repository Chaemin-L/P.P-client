export const BackdateToItemtype = (dateString: string) => {
  const date = new Date(dateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = date.toLocaleDateString("ko-KR", { weekday: "long" });

  const monthStr = `${month}월`;
  const dayStr = `${day}일`;
  const dayOfWeekStr = `(${dayOfWeek})`;

  return `${monthStr} ${dayStr} ${dayOfWeekStr}`;
};

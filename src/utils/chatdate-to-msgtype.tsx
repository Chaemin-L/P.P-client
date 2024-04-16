export const ChatdateToMsgtype = (dateString: string) => {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const plot = hours >= 12 ? "오후" : "오전";
  hours = hours % 12 || 12; // 0시를 12시로 표시하기 위해

  return `${plot} ${hours}:${minutes}`;
};

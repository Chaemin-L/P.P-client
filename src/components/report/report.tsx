import { useState } from "react";
import { styled } from "styled-components";

import { ReportButton } from "./report-button";
import { ReportProps } from "./type";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { usePostReport } from "@/hooks/queries/usePostReport";

export const Report = ({ postId, onSuccessReport }: ReportProps) => {
  const { mutate: reportPost } = usePostReport();
  const [reportList, setReportList] = useState([
    { content: "광고/홍보 글이에요", state: false },
    { content: "중복/도배 글이에요", state: false },
    { content: "이웃 비방/혐오 표현을 사용했어요", state: false },
    { content: "카테고리에 부적절한 글이에요", state: false },
  ]);

  const handleReport = () => {
    const temp = reportList.find((e) => {
      if (e.state) return e;
    });
    reportPost(
      { postId: postId, reportMsg: temp ? temp.content : "" },
      { onSuccess: () => onSuccessReport() },
    );
  };

  return (
    <Wrapper>
      <CheckMsg>신고 이유를 선택해주세요</CheckMsg>
      {reportList.map((item, index) => (
        <ReportButton
          onClick={() => {
            const updatedReportList = reportList.map((tempItem, tempIndex) => ({
              ...tempItem,
              state: tempIndex === index ? !tempItem.state : false,
            }));
            setReportList(updatedReportList);
          }}
          key={index}
          state={item.state}
        >
          {item.content}
        </ReportButton>
      ))}
      <BottomFixed>
        <BottomFixed.Button
          color="orange"
          rounded={true}
          onClick={() => {
            handleReport();
          }}
        >
          신고하기
        </BottomFixed.Button>
      </BottomFixed>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  font-size: 1.11rem;
  padding: 0 9.7%;
`;

const CheckMsg = styled.div`
  font-size: 1.39rem;
  margin: 10% 0;
`;

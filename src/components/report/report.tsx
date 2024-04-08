import { styled } from "styled-components";

import { ReportButton } from "./report-button";
import { ReportProps } from "./type";

import { usePostReport } from "@/hooks/queries/usePostReport";

export const Report = ({ postId, onSuccessReport }: ReportProps) => {
  const reportPost = usePostReport();
  const reportList = [
    "광고/홍보 글이에요",
    "중복/도배 글이에요",
    "이웃 비방/혐오 표현을 사용했어요",
    "카테고리에 부적절한 글이에요",
  ];

  const handleReport = () => {
    // reportPost.mutate(postId, {
    //   onSuccess: () => {
    //     onSuccessReport();
    //   },
    // });
    onSuccessReport();
  };

  return (
    <Wrapper>
      <CheckMsg>신고 이유를 선택해주세요</CheckMsg>
      {reportList.map((item, index) => (
        <ReportButton
          onClick={() => {
            handleReport();
          }}
          key={index}
        >
          {item}
        </ReportButton>
      ))}
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
  font-size: 20px;
  padding: 0 9.7%;
`;

const CheckMsg = styled.div`
  font-size: 25px;
  margin: 10% 0;
`;

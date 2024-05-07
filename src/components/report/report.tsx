import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import { ReportButton } from "./report-button";
import { ReportProps } from "./type";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { Modal } from "@/components/common/modal";
import { useGetProfile } from "@/hooks/queries/useGetProfile";
import { usePostBlock } from "@/hooks/queries/usePostBlock";
import { usePostReport } from "@/hooks/queries/usePostReport";

export const Report = ({ postId, onSuccessReport, creatorId }: ReportProps) => {
  const { data: profileData } = useGetProfile(
    Number(creatorId) > -1
      ? Number(creatorId)
      : Number(localStorage.getItem("userId")),
  );
  const postBlock = usePostBlock();
  const [checkBlock, setCheckBlock] = useState(false);
  const [blockFinish, setBlockFinish] = useState(false);

  const navigate = useNavigate();
  const { mutate: reportPost } = usePostReport();
  const [reportList, setReportList] = useState([
    { content: "광고/홍보 글이에요", state: false },
    { content: "중복/도배 글이에요", state: false },
    { content: "이웃 비방/혐오 표현을 사용했어요", state: false },
    { content: "카테고리에 부적절한 글이에요", state: false },
  ]);
  const [reportModal, setReportModal] = useState(false);

  const handleReport = () => {
    const temp = reportList.find((e) => {
      if (e.state) return e;
    });
    reportPost(
      { postId: postId, reportMsg: temp ? temp.content : "" },
      { onSuccess: () => onSuccessReport() },
    );
  };

  const [isError, setIsError] = useState(false);

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
      {reportModal && (
        <Modal
          onClose={() => {
            setReportModal(false);
          }}
        >
          <Modal.Title text="신고가 접수되었습니다." />
          <Modal.Button
            onClick={() => {
              navigate("/chat");
            }}
          >
            홈화면으로 이동
          </Modal.Button>
          {!profileData?.blocked && <Modal.Button>작성자 차단</Modal.Button>}
        </Modal>
      )}
      {checkBlock && (
        <Modal
          onClose={() => {
            setReportModal(true);
            setCheckBlock(false);
          }}
        >
          <Modal.Title
            text={`작성자 ${profileData?.nickName}님을 \n 차단하시겠습니까?`}
          />
          <Modal.Button
            onClick={() => {
              if (Number(creatorId) > -1) {
                postBlock.mutate(Number(creatorId), {
                  onSuccess: () => {
                    setCheckBlock(false);
                    setBlockFinish(true);
                  },
                  onError: () => {
                    setIsError(true);
                  },
                });
              } else {
                setIsError(true);
              }
            }}
          >
            차단하기
          </Modal.Button>
        </Modal>
      )}
      {blockFinish && (
        <Modal
          onClose={() => {
            setBlockFinish(false);
          }}
        >
          <Modal.Title
            text={`${profileData?.nickName}님이 \n 차단되었습니다.`}
          />
          <Modal.Button
            onClick={() => {
              navigate("/post");
            }}
          >
            홈화면으로 이동
          </Modal.Button>
        </Modal>
      )}
      {isError && (
        <Modal
          onClose={() => {
            setIsError(false);
          }}
        >
          <Modal.Title text="알 수 없는 오류가 발생했습니다 \n 다시 시도해주세요." />
          <Modal.Button
            onClick={() => {
              navigate("/post");
            }}
          >
            홈화면으로 이동
          </Modal.Button>
        </Modal>
      )}
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

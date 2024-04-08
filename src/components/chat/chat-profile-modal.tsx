import { useState } from "react";
import styled from "styled-components";

import { ChatProfileModalType } from "./type";

import { Modal } from "@/components/common/modal";
import { useGetProfile } from "@/hooks/queries/useGetProfile";
import { colorTheme } from "@/style/color-theme";

export const ChatProfileModal = ({ userId, onClose }: ChatProfileModalType) => {
  const { data } = useGetProfile(userId);

  const [checkReport, setCheckReport] = useState(false);
  const [reportFinish, setReportFinish] = useState(false);
  // 다른 유저의 프로필 가져오기 안됨

  return (
    <Modal
      onClose={() => {
        onClose();
        setCheckReport(false);
        setReportFinish(false);
      }}
    >
      {checkReport && (
        <ModalDiv>
          <Modal.Title text={`${data?.nickNmae}님을`} />
          <Modal.Title text="차단하시겠습니까?" />
          <Modal.Button>차단하기</Modal.Button>
        </ModalDiv>
      )}
      {!checkReport && !reportFinish && (
        <ModalDiv>
          <ModalHeader>
            <span>{data?.nickNmae}</span>
            <ModalHeaderLine />
            <span>{data?.gender}</span>
            <ModalHeaderLine />
            <span>{data?.ageRange + "대"}</span>
          </ModalHeader>
          <ImgContainer>
            <Img src={data?.profileImage} />
          </ImgContainer>
          <AddressSpan>{data?.address}</AddressSpan>
          <Modal.Button onClick={() => setCheckReport(true)}>
            차단하기
          </Modal.Button>
        </ModalDiv>
      )}
    </Modal>
  );
};

const ModalDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: center;
  font-size: 25px;
  margin-bottom: 10px;
`;

const ModalHeaderLine = styled.div`
  height: 20px;
  width: 2px;
  border-radius: 1px;
  background-color: ${colorTheme.blue300};
  margin: 0 6px;
`;

const ImgContainer = styled.div`
  width: 70%;
  padding-top: 70%;
  position: relative;
  border-radius: 35px;
  background-color: ${colorTheme.blue300};
`;

const Img = styled.img`
  width: 90%;
  height: 90%;
  top: 5%;
  left: 5%;
  position: absolute;
  border-radius: 35px;
`;

const AddressSpan = styled.span`
  width: 100%;
  text-align: center;
  font-size: 18px;
  padding: 10% 0;
`;

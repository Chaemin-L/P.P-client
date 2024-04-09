import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import LocationSVG from "@/assets/icons/location.svg";
import { AppBar } from "@/components/common/app-bar";
import { BottomFixed } from "@/components/common/bottom-fixed";
import { Modal } from "@/components/common/modal";
import { DefaultLayout } from "@/components/layout/default-layout";
import applicantListData from "@/data/applicant-list-data.json";
import { colorTheme } from "@/style/color-theme";

type ApplicantItemProps = {
  applyId: number;
  applicantInfo: {
    profileId: number;
    nickName: string;
    profileImage: string;
    address: string;
  };
  createdTime: string;
  status: string;
  introduction: string;
  postId: number;
  isAccepted: boolean;

  selected: boolean;
  onSelect: (event: MouseEvent<HTMLButtonElement>) => void;
};

const ApplicantItem = (props: ApplicantItemProps) => {
  return (
    <ApplicantItemWrapper>
      <ApplicantImage>
        <img src={props.applicantInfo.profileImage} />
      </ApplicantImage>
      <ApplicantInfo>
        <ApplicantLocation>{props.applicantInfo.address}</ApplicantLocation>
        <ApplicantNickname>{props.applicantInfo.nickName}</ApplicantNickname>
        <ApplicantMoreInfo>
          도움횟수 16 <Bullet /> 남 <Bullet /> 45세
        </ApplicantMoreInfo>
      </ApplicantInfo>
      <ApplyButton $selected={props.selected} onClick={props.onSelect}>
        {props.selected ? "선택됨" : "선택하기"}
      </ApplyButton>
    </ApplicantItemWrapper>
  );
};

export const ApplicantListPage = () => {
  const [applyIds, setApplyIds] = useState<number[]>([]);
  const [applyModal, setApplyModal] = useState<boolean>();

  return (
    <DefaultLayout
      scrollbar
      appbar={
        <AppBar isBorderExist>
          <AppBar.AppBarNavigate>
            <AppBar.BackButton />
            <AppBar.HeaderText isBigSizeText>참여관리</AppBar.HeaderText>
          </AppBar.AppBarNavigate>
        </AppBar>
      }
    >
      {applicantListData.map((a) => (
        <ApplicantItem
          key={a.applyId}
          {...a}
          selected={applyIds.includes(a.applicantInfo.profileId)}
          onSelect={() => {
            const id = a.applicantInfo.profileId;
            if (applyIds.includes(id)) {
              setApplyIds((prev) => prev.filter((p) => p !== id));
            } else {
              setApplyIds((prev) => [...prev, id]);
            }
          }}
        />
      ))}
      <BottomFixed>
        <BottomFixed.Button color="orange" onClick={() => setApplyModal(true)}>
          {applyIds.length}명 수락하기
        </BottomFixed.Button>
      </BottomFixed>
      {applyModal && (
        <Modal
          onClose={() => {
            setApplyModal(false);
          }}
        >
          <Modal.Title text="신청 수락 완료" />
          <Modal.Button color="orange">채팅방 만들기</Modal.Button>
          <Modal.Button>모집완료</Modal.Button>
        </Modal>
      )}
    </DefaultLayout>
  );
};

const ApplicantItemWrapper = styled.div`
  display: flex;
  padding: 20px 25px;
  gap: 10px;
  border-top: 1px solid #e4e8f1;
`;

const ApplicantImage = styled.div`
  display: flex;
  position: relative;
  flex: 0.4;
  width: 100%;
  height: 100%;
  align-items: center;
  & img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 90%;
    height: 90%;
    object-fit: cover;
    border-radius: 10px;
  }
  &::before {
    content: "";
    display: block;
    padding-top: 100%;
  }
`;

const ApplicantInfo = styled.div`
  display: flex;
  padding-bottom: 17px;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`;

const ApplicantLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.83rem;
  &::before {
    width: 14px;
    height: 17px;
    border-radius: 1px;
    background-image: url(${LocationSVG});
    background-position: center;
    background-repeat: no-repeat;
    content: " ";
  }
`;

const ApplicantNickname = styled.div`
  color: ${colorTheme.blue900};
  font-size: 1.1rem;
  font-weight: 500;
`;

const ApplicantMoreInfo = styled.div`
  display: flex;
  gap: 4px;
  font-size: 0.72rem;
  align-items: center;
`;

const Bullet = styled.span`
  display: inline-block;
  width: 4px;
  height: 4px;
  background-color: black;
  border-radius: 50%;
`;

const ApplyButton = styled.button<{ $selected: boolean }>`
  flex: 0.4;
  display: flex;
  padding: 40px 12px;
  border: 0;
  border-radius: 15px;
  background-color: #e4e8f1;
  color: ${colorTheme.blue500};
  font-size: 0.8rem;
  justify-content: center;
  align-items: center;

  ${({ $selected }) =>
    $selected && `background-color: ${colorTheme.orange400};color: white`}
`;

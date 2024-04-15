import { MouseEvent, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";

import { ChatMakeRequest } from "@/api/types/chat-type";
import LocationSVG from "@/assets/icons/location.svg";
import { AppBar } from "@/components/common/app-bar";
import { BottomFixed } from "@/components/common/bottom-fixed";
import { Modal } from "@/components/common/modal";
import { DefaultLayout } from "@/components/layout/default-layout";
import { useChangeStatus } from "@/hooks/queries/useChangeStatus";
import { useGetApplyList } from "@/hooks/queries/useGetApplyList";
import { usePostApplyAccept } from "@/hooks/queries/usePostApplyAccept";
import { usePostMakeChat } from "@/hooks/queries/usePostMakeChat";
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

  const { postId } = useParams();

  const { data } = useGetApplyList(postId!);
  const { mutate: accept } = usePostApplyAccept(postId!);
  const { mutate: changeStatus } = useChangeStatus(postId!);
  const { mutate: makeChat } = usePostMakeChat();

  const navigate = useNavigate();

  console.log(data);

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
      {data?.map((applicant) => (
        <ApplicantItem
          key={applicant.applyId}
          {...applicant}
          selected={applyIds.includes(applicant.applyId)}
          onSelect={() => {
            const id = applicant.applyId;
            if (applyIds.includes(id)) {
              setApplyIds((prev) => prev.filter((p) => p !== id));
            } else {
              setApplyIds((prev) => [...prev, id]);
            }
          }}
        />
      ))}
      <BottomFixed>
        <BottomFixed.Button
          color="orange"
          onClick={() => {
            accept(applyIds);
            setApplyModal(true);
          }}
        >
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
          <Modal.Button
            color="orange"
            onClick={() => {
              // TODO: 채팅방 생성 후 라우팅
              const tempList: string[] = applyIds.map((id) => id.toString());
              const tempData: ChatMakeRequest = {
                postId: Number(postId),
                memberIds: tempList,
              };

              makeChat(tempData);
            }}
          >
            채팅방 만들기
          </Modal.Button>
          <Modal.Button onClick={() => changeStatus("RECRUITMENT_COMPLETED")}>
            모집완료
          </Modal.Button>
        </Modal>
      )}
    </DefaultLayout>
  );
};

const ApplicantItemWrapper = styled.div`
  height: 20%;
  display: flex;
  padding: 20px 25px;
  gap: 10px;
  border-top: 1px solid #e4e8f1;
`;

const ApplicantImage = styled.div`
  height: 100%;
  display: flex;
  position: relative;
  flex: 1.2;
  align-items: start;
  & img {
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 10px;
  }
`;

const ApplicantInfo = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 2px;
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
  flex: 1.1;
  display: flex;
  padding: 30px 10px;
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

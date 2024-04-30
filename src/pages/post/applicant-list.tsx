import { MouseEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";

import { ApplyType } from "@/api/types/apply-type";
import { ChatMakeRequest, ChatMakeRoom } from "@/api/types/chat-type";
import LocationSVG from "@/assets/icons/location.svg";
import { AppBar } from "@/components/common/app-bar";
import { BottomFixed } from "@/components/common/bottom-fixed";
import { Modal } from "@/components/common/modal";
import { DefaultLayout } from "@/components/layout/default-layout";
import { useCheckChatMake } from "@/hooks/chat/useChatMake";
import { useChangeStatus } from "@/hooks/queries/useChangeStatus";
import { useGetApplyList } from "@/hooks/queries/useGetApplyList";
import { usePostApplyAccept } from "@/hooks/queries/usePostApplyAccept";
import { usePostMakeChat } from "@/hooks/queries/usePostMakeChat";
import { usePostRollback } from "@/hooks/queries/usePostRollback";
import { usePutChatNewMember } from "@/hooks/queries/usePutChatNewMember";
import { colorTheme } from "@/style/color-theme";

type ApplicantItemProps = {
  selected: boolean;
  onSelect: (event: MouseEvent<HTMLButtonElement>) => void;
} & ApplyType;

const equals = ({ a, b }: { a: number[]; b: number[] }) =>
  JSON.stringify(a) === JSON.stringify(b);

const newMember = ({ a, b }: { a: number[]; b: number[] }) => {
  a.sort();
  b.sort();
  return a.filter((x) => !b.includes(x));
};

const ApplicantItem = (props: ApplicantItemProps) => {
  // const [profileImage, setProfileImage] = useState<string>();
  // useEffect(() => {
  //   // const blob = new Blob([props.applicantInfo.profileImage], {
  //   //   type: "image/png;base64",
  //   // });
  //   // const blobURL = URL.createObjectURL(blob);
  //   // setProfileImage(blobURL);
  //   // return () => URL.revokeObjectURL(blobURL);
  //   const reader = new FileReader();
  //   reader.readAsDataURL(new Blob([props.applicantInfo.profileImage]));
  //   reader.onload = () => {
  //     setProfileImage(reader.result as string);
  //   };
  // }, []);

  // console.log(profileImage);

  return (
    <ApplicantItemWrapper>
      <ApplicantImage>
        {/* <img src={profileImage} /> */}
        <img src={props.applicantInfo.profileImage} />
      </ApplicantImage>
      <ApplicantInfo>
        <ApplicantLocation>{props.applicantInfo.address}</ApplicantLocation>
        <ApplicantNickname>{props.applicantInfo.nickName}</ApplicantNickname>
        <ApplicantMoreInfo>
          도움횟수 16 <Bullet />{" "}
          {props.applicantInfo.gender === "male" ? "남" : "여"} <Bullet />{" "}
          {props.applicantInfo.ageRange * 10}대
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
  const [applyUserIds, setApplyUserIds] = useState<number[]>([]);
  const [originUserIds, setOriginUserIds] = useState<number[]>([]);

  const { postId } = useParams();

  const { data } = useGetApplyList(postId!);
  const { mutate: accept } = usePostApplyAccept(postId!);
  const { mutate: changeStatus } = useChangeStatus(postId!);

  const { mutate: makeChat } = usePostMakeChat();
  const chatRoomId = useCheckChatMake(postId!);
  const [chatMakeRoomId, setChatMakeRoomId] = useState<ChatMakeRoom | null>(
    null,
  );
  const navigate = useNavigate();

  const { mutate: postRollback } = usePostRollback();
  const { mutate: putNewMember } = usePutChatNewMember();

  const [isApplyError, setIsApplyError] = useState("");
  const [isApplyChangeCheck, setIsApplyChangeCheck] = useState(false);

  console.log(chatRoomId);
  console.log(data);

  const checkChange = ({ a, b }: { a: number[]; b: number[] }) => {
    a.sort();
    b.sort();
    return equals({ a: a, b: b });
  };

  useEffect(() => {
    const tempApplyIds: number[] = [];
    const tempApplyUserIds: number[] = [];
    data?.map((item) => {
      if (item.status !== "WAITING") {
        tempApplyIds.push(item.applyId);
        tempApplyUserIds.push(item.applicantInfo.userId);
      }
    });
    setApplyIds(tempApplyIds);
    setApplyUserIds(tempApplyUserIds);
    setOriginUserIds(tempApplyUserIds);
  }, []);

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
            const userId = applicant.applicantInfo.userId;
            if (applyIds.includes(id)) {
              setApplyIds((prev) => prev.filter((p) => p !== id));
              setApplyUserIds((prev) => prev.filter((p) => p !== userId));
            } else {
              setApplyIds((prev) => [...prev, id]);
              setApplyUserIds((prev) => [...prev, userId]);
            }
          }}
        />
      ))}
      <BottomFixed>
        <BottomFixed.Button
          color="orange"
          onClick={() => {
            if (applyIds.length > 0) {
              if (checkChange({ a: originUserIds, b: applyUserIds })) {
                setIsApplyError("APPLY_ID_NOT_CHANGE");
              } else {
                if (originUserIds.length > 0) {
                  setIsApplyChangeCheck(true);
                } else {
                  accept(applyIds, {
                    onSuccess: () => {
                      const tempList: string[] = applyUserIds.map((id) =>
                        id.toString(),
                      );
                      const tempData: ChatMakeRequest = {
                        postId: Number(postId),
                        memberIds: tempList,
                      };

                      makeChat(tempData, {
                        onSuccess: (res) => {
                          setApplyModal(true);
                          setChatMakeRoomId(res);
                          console.log("makeChat: ", res);
                        },
                      });
                    },
                    onError: () => {
                      setIsApplyError("APPLY_ID_LENGTH_OVER");
                    },
                  });
                }
              }
            } else {
              setIsApplyError("APPLY_ID_LENGTH_ZERO");
            }
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
              const myId = localStorage.getItem("userId");
              if (chatMakeRoomId !== null && myId !== null) {
                navigate(`/chat/detail`, {
                  state: {
                    roomId: chatMakeRoomId.roomId,
                    postId: chatMakeRoomId.postId,
                    memberCount: chatMakeRoomId.memberCount,
                    creatorId: myId,
                  },
                });
              }
            }}
          >
            채팅방 가기
          </Modal.Button>
          <Modal.Button onClick={() => changeStatus("RECRUITMENT_COMPLETED")}>
            모집완료
          </Modal.Button>
        </Modal>
      )}
      {isApplyError !== "" && (
        <Modal onClose={() => setIsApplyError("")}>
          {isApplyError === "APPLY_ID_LENGTH_ZERO" && (
            <Modal.Title text="수락할 지원자 선택 후 \n 수락해주세요" />
          )}
          {isApplyError === "APPLY_ID_LENGTH_OVER" && (
            <Modal.Title text="최대 신청자 수를 넘겼습니다" />
          )}
          {isApplyError === "APPLY_ID_NOT_CHANGE" && (
            <Modal.Title text="변경 사항이 없습니다." />
          )}
        </Modal>
      )}
      {isApplyChangeCheck && (
        <Modal
          onClose={() => {
            setIsApplyChangeCheck(false);
          }}
        >
          <Modal.Title text="정말 참여자를 바꾸겠습니까?" />
          <Modal.Button
            onClick={() => {
              // 게시글 status 변경 -> 수정한 지원자 비교하여 없앤 지원자는 delete accept, 재 accept, chatting 인원 수정, apply modal true
              const temp = newMember({ a: applyUserIds, b: originUserIds });
              postRollback(postId!, {
                onSuccess: () => {
                  accept(temp, {
                    onSuccess: () => {
                      const tempList: string[] = temp.map((id) =>
                        id.toString(),
                      );
                      const tempData = {
                        chatRoomId: chatRoomId,
                        addingData: {
                          postId: Number(postId),
                          memberIds: tempList,
                        },
                      };

                      putNewMember(tempData, {
                        onSuccess: (res) => {
                          setChatMakeRoomId(res);
                          setApplyModal(true);
                        },
                      });
                    },
                  });
                },
              });
            }}
          >
            참여자 변경
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

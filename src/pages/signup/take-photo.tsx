import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";

import { Button } from "@/components/common/button";
import { Modal } from "@/components/common/modal";
import Camera from "@/components/signup/camera";
import { profileState } from "@/recoil/atoms/profile-state";

type TakePhotoPageProps = {
  nextStep: () => void;
};

export const TakePhotoPage = ({ nextStep }: TakePhotoPageProps) => {
  const [dataUri, setDataUri] = useState("");
  const [warningModal, setWarningModal] = useState(false);

  const setProfile = useSetRecoilState(profileState);

  const nextPage = () => {
    setProfile((profile) => ({
      ...profile,
      file: dataUri,
    }));
    nextStep();
  };

  return (
    <>
      <ContentLayout>
        <ButtonContainer>
          <Button onClick={() => setDataUri("")}>다시찍기</Button>
          <Button
            onClick={() =>
              dataUri.length ? nextPage() : setWarningModal(true)
            }
          >
            완료
          </Button>
        </ButtonContainer>
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
          }}
        >
          {dataUri.length ? (
            <img src={dataUri} style={{ width: "100%" }} />
          ) : (
            <Camera setDataUri={setDataUri} />
          )}
        </div>
      </ContentLayout>
      {warningModal && (
        <Modal onClose={() => setWarningModal(false)}>
          <Modal.Title text="본인 사진 촬영은\n필수입니다." />
        </Modal>
      )}
    </>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ContentLayout = styled.div`
  display: flex;
  flex: 1;
  margin-top: 50px;
  flex-direction: column;
  gap: 20px;
`;

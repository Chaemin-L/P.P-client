import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import { AddressPage } from "./address";
import { BirthPage } from "./birth";
import { GenderPage } from "./gender";
import { NamePage } from "./name";
import { NicknamePage } from "./nickname";
import { PasswordPage } from "./password";
import { PhotoDescriptionPage } from "./photo-description";
import { TakePhotoPage } from "./take-photo";

import { Modal } from "@/components/common/modal";
import { DefaultLayout } from "@/components/layout/default-layout";

const STEPSIZE = 7;

type ProgressDotsType = {
  activeIdx: number;
};

const ProgressDots = ({ activeIdx }: ProgressDotsType) => {
  if (activeIdx === 0) return <></>;
  return (
    <ProgressDotsContainer>
      {new Array(STEPSIZE).fill(0).map((_, i) => (
        <Dot key={i} $active={activeIdx === i + 1} />
      ))}
    </ProgressDotsContainer>
  );
};

export const ProfilePage = () => {
  const [step, setStep] = useState<number>(1);
  const [requiredModal, setRequiredModal] = useState<boolean>(false);
  const [requiredElem, setRequiredElem] = useState<string>("");

  const nextStep = () => setStep((step) => step + 1);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("role") === "ROLE_USER") return navigate("/post");
  }, []);

  useEffect(() => {
    switch (step) {
      case 0:
        setRequiredElem("본인 사진");
        break;
      case 1:
        setRequiredElem("이름");
        break;
      case 2:
        setRequiredElem("닉네임");
        break;
      case 5:
        setRequiredElem("생년월일");
        break;
      default:
        break;
    }
  }, [step]);

  return (
    <DefaultLayout appbar={<ProgressDots activeIdx={step} />}>
      {step === 1 && (
        <NamePage nextStep={nextStep} onModal={() => setRequiredModal(true)} />
      )}
      {step === 2 && (
        <NicknamePage
          nextStep={nextStep}
          onModal={() => setRequiredModal(true)}
        />
      )}
      {step === 3 && <GenderPage nextStep={nextStep} />}
      {step === 4 && <PhotoDescriptionPage nextStep={() => setStep(0)} />}
      {step === 0 && (
        <TakePhotoPage
          nextStep={() => setStep(5)}
          onModal={() => setRequiredModal(true)}
        />
      )}
      {step === 5 && (
        <BirthPage nextStep={nextStep} onModal={() => setRequiredModal(true)} />
      )}
      {step === 6 && <AddressPage nextStep={nextStep} />}
      {step === 7 && <PasswordPage />}
      {requiredModal && (
        <Modal onClose={() => setRequiredModal(false)}>
          <Modal.Title text={`${requiredElem}은\\n필수 항목입니다.`} />
        </Modal>
      )}
    </DefaultLayout>
  );
};

const ProgressDotsContainer = styled.div`
  display: flex;
  height: 66px;
  padding-top: 28px;
  padding-bottom: 28px;
  justify-content: center;
  align-items: center;
  gap: 28px;
`;

const Dot = styled.div<{ $active: boolean }>`
  width: 5px;
  height: 5px;
  border: 0;
  border-radius: 50%;
  background-color: #f9c4b0;
  transition: all 0.5s;
  ${({ $active }) =>
    $active &&
    "width: 10px; height: 10px; background-color: white; border: 5px double #F17547"};
`;

import { useEffect, useState } from "react";
import { styled } from "styled-components";

import { BirthdayPage } from "./birthday";
import { GenderPage } from "./gender";
import { NicknamePage } from "./nickname";
import { PhotoDescriptionPage } from "./photo-description";
import { TakePhotoPage } from "./take-photo";
import { WelcomePage } from "./welcome";

import { Modal } from "@/components/common/modal";
import { DefaultLayout } from "@/components/layout/default-layout";

const STEPSIZE = 5;

type ProgressDotsType = {
  activeIdx: number;
};

const ProgressDots = ({ activeIdx }: ProgressDotsType) => {
  if (activeIdx === 0) return <></>;
  return (
    <ProgressDotsContainer>
      {new Array(STEPSIZE).fill(0).map((a, i) => (
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

  useEffect(() => {
    switch (step) {
      case 0:
        setRequiredElem("본인 사진");
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
      {step === 1 && <WelcomePage nextStep={nextStep} />}
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
      {step === 5 && <BirthdayPage onModal={() => setRequiredModal(true)} />}
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

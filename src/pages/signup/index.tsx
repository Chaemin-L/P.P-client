import { useState } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import { styled } from "styled-components";

import { BirthdayPage } from "./birthday";
import { GenderPage } from "./gender";
import { NicknamePage } from "./nickname";
import { PhotoDescriptionPage } from "./photo-description";
import { TakePhotoPage } from "./take-photo";
import { WelcomePage } from "./welcome";

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

export const SignupPage = () => {
  const [step, setStep] = useState<number>(1);

  const nextStep = () => setStep((step) => step + 1);

  return (
    <DefaultLayout appbar={<ProgressDots activeIdx={step} />}>
      {step === 1 && <WelcomePage nextStep={nextStep} />}
      {step === 2 && <NicknamePage nextStep={nextStep} />}
      {step === 3 && <GenderPage nextStep={nextStep} />}
      {step === 4 && <PhotoDescriptionPage nextStep={() => setStep(0)} />}
      {step === 0 && <TakePhotoPage nextStep={() => setStep(5)} />}
      {step === 5 && <BirthdayPage />}
    </DefaultLayout>
  );
};

const ProgressDotsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 28px;
  padding-bottom: 28px;
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

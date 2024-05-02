import { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { Header } from "@/components/profile/header";
import { Input } from "@/components/profile/input";
import { profileState } from "@/recoil/atoms/profile-state";

type BirthPageProps = {
  nextStep: () => void;
  onModal: () => void;
};

export const BirthPage = ({ nextStep, onModal }: BirthPageProps) => {
  const [bYear, setBYear] = useState<string>("");
  const [bMonth, setBMonth] = useState<string>("");
  const [bDay, setBDay] = useState<string>("");
  const [error, setError] = useState<boolean>();
  const firstInputRef = useRef<HTMLInputElement>(null);

  const setProfile = useSetRecoilState(profileState);
  const saveProfile = () => {
    if (
      isNaN(+bYear) ||
      isNaN(+bMonth) ||
      isNaN(+bDay) ||
      +bYear > new Date().getFullYear() ||
      +bMonth < 0 ||
      +bMonth > 12 ||
      +bDay < 0 ||
      +bDay > new Date(+bYear, +bMonth, 0).getDate()
    ) {
      setError(true);
      return;
    }

    setProfile((profile) => ({
      ...profile,
      birth: [bYear, bMonth.padStart(2, "0"), bDay.padStart(2, "0")].join("-"),
    }));

    nextStep();
  };

  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  return (
    <ContentLayout>
      <Header text="생년월일을 입력해주세요" />
      <InputContainer>
        <InputWrapper>
          <Input
            ref={firstInputRef}
            maxLength={4}
            onChange={(event) => setBYear(event.target.value)}
          />
          <span>년도</span>
        </InputWrapper>
        <InputWrapper>
          <Input
            maxLength={2}
            onChange={(event) => setBMonth(event.target.value)}
          />
          <span>월</span>
          <Input
            maxLength={2}
            onChange={(event) => setBDay(event.target.value)}
          />
          <span>일</span>
        </InputWrapper>
      </InputContainer>
      {error && <ErrorMessage>올바른 생년월일을 입력해주세요</ErrorMessage>}
      <BottomFixed>
        <BottomFixed.Button
          color="orange"
          onClick={() => (bYear && bMonth && bDay ? saveProfile() : onModal())}
        >
          다음
        </BottomFixed.Button>
      </BottomFixed>
    </ContentLayout>
  );
};

const ContentLayout = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
  margin-top: 86px;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

const InputContainer = styled.div`
  max-width: 90%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  gap: 10px;
  & > input {
    padding: 12px 15px; // 가로폭이 좁은 기기(like galaxy fold) 고려
  }
  & > span {
    display: flex;
    font-size: 1.67rem;
    font-color: #a1a1a1;
    white-space: nowrap;
    justify-content: center;
    align-items: center;
  }
`;

const ErrorMessage = styled.span`
  font-size: 0.83rem;
  color: red;
`;

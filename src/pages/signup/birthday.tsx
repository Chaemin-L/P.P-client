import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { styled } from "styled-components";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { Header } from "@/components/signup/header";
import { Input } from "@/components/signup/input";
import { profileState } from "@/recoil/atoms/profile-state";

type BirthdayPageProps = {
  onModal: () => void;
};

export const BirthdayPage = ({ onModal }: BirthdayPageProps) => {
  const [birthday, setBirthday] = useState<string>("");
  const [error, setError] = useState<boolean>();
  const navigate = useNavigate();

  const setProfile = useSetRecoilState(profileState);
  const profile = useRecoilValue(profileState);

  const nextStep = () => {
    if (isNaN(+birthday)) {
      setError(true);
      return;
    }
    setProfile((profile) => ({
      ...profile,
      birthday,
    }));
    console.log(profile);

    navigate("/signup/done");
  };

  return (
    <ContentLayout>
      <Header text="생년월일을 입력해주세요" />
      <InputContainer>
        <InputWrapper>
          <Input
            maxLength={4}
            onChange={(event) => setBirthday(event.target.value)}
          />
          <span>년도</span>
        </InputWrapper>
        <InputWrapper>
          <Input
            maxLength={4}
            onChange={(event) => setBirthday(event.target.value)}
          />
          <span>월</span>
          <Input
            maxLength={4}
            onChange={(event) => setBirthday(event.target.value)}
          />
          <span>일</span>
        </InputWrapper>
      </InputContainer>
      {error && <ErrorMessage>올바른 생년월일을 입력해주세요</ErrorMessage>}
      <BottomFixed>
        <BottomFixed.Button
          color="orange"
          onClick={() => (birthday ? nextStep() : onModal())}
        >
          완성하기
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
    font-size: 30px;
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

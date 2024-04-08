import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { styled } from "styled-components";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { Header } from "@/components/signup/header";
import { Input } from "@/components/signup/input";
import { profileState } from "@/recoil/atoms/profile-state";

export const BirthdayPage = () => {
  const [birthday, setBirthday] = useState<string>("");
  const navigate = useNavigate();

  const setProfile = useSetRecoilState(profileState);
  const profile = useRecoilValue(profileState);

  const nextStep = () => {
    setProfile((profile) => ({
      ...profile,
      birthday,
    }));
    console.log(profile);

    navigate("/signup/6");
  };

  return (
    <ContentLayout>
      <Header text="생년월일을 입력해주세요" />
      <InputContainer>
        <Input
          maxLength={4}
          onChange={(event) => setBirthday(event.target.value)}
        />
        <span>년도</span>
      </InputContainer>
      <BottomFixed>
        <BottomFixed.Button
          color="orange"
          onClick={() => (birthday ? nextStep() : navigate("/signup/6"))}
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
  width: 100%;
  display: flex;
  padding: 10%;
  gap: 10px;
  & > input {
    margin: auto;
    padding: 12px 20px; // 가로폭이 좁은 기기(like galaxy fold) 고려
    flex: 3;2
  }
  & > span {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-color: #a1a1a1;
  }
`;

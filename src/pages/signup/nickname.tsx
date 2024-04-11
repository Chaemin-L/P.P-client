import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { Description } from "@/components/signup/description";
import { Header } from "@/components/signup/header";
import { Input } from "@/components/signup/input";
import { profileState } from "@/recoil/atoms/profile-state";

type NicknamePageProps = {
  nextStep: () => void;
};

export const NicknamePage = ({ nextStep }: NicknamePageProps) => {
  const [nickname, setNickname] = useState<string>("");

  const setProfile = useSetRecoilState(profileState);

  return (
    <ContentLayout>
      <Header text="우선\n닉네임을 정해볼까요?" />
      <Input
        maxLength={5}
        value={nickname}
        onChange={({ target }) => setNickname(target.value)}
      />
      <Description text="닉네임을 최대 5글자로\n쓸 수 있어요~" />
      <BottomFixed>
        <BottomFixed.Button
          onClick={() => {
            setProfile((profile) => ({
              ...profile,
              nickname,
            }));
            nextStep();
          }}
        >
          다음
        </BottomFixed.Button>
      </BottomFixed>
    </ContentLayout>
  );
};

const ContentLayout = styled.div`
  display: flex;
  margin-top: 86px;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

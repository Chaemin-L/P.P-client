import { useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { Description } from "@/components/profile/description";
import { Header } from "@/components/profile/header";
import { Input } from "@/components/profile/input";
import { profileState } from "@/recoil/atoms/profile-state";

type NicknamePageProps = {
  nextStep: () => void;
  onModal: () => void;
};

export const NicknamePage = ({ nextStep, onModal }: NicknamePageProps) => {
  const [nickName, setNickName] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  const setProfile = useSetRecoilState(profileState);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <ContentLayout>
      <Header text="닉네임을 정해볼까요?" />
      <Input
        ref={inputRef}
        maxLength={5}
        value={nickName}
        onChange={({ target }) => setNickName(target.value)}
        style={{ maxWidth: "80%" }}
      />
      <Description text="닉네임을 최대 5글자로\n쓸 수 있어요~" />
      <BottomFixed>
        <BottomFixed.Button
          onClick={() => {
            if (nickName.length === 0) {
              onModal();
              return;
            }
            setProfile((profile) => ({
              ...profile,
              nickName,
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

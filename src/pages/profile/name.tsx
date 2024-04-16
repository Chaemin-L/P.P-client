import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { Description } from "@/components/profile/description";
import { Header } from "@/components/profile/header";
import { Input } from "@/components/profile/input";
import { profileState } from "@/recoil/atoms/profile-state";

type NamePageProps = {
  nextStep: () => void;
  onModal: () => void;
};

export const NamePage = ({ nextStep, onModal }: NamePageProps) => {
  const [name, setName] = useState<string>("");

  const setProfile = useSetRecoilState(profileState);

  return (
    <ContentLayout>
      <Header text="우선\n이름을 알려주세요!" />
      <Input
        maxLength={5}
        value={name}
        onChange={({ target }) => setName(target.value)}
        style={{ maxWidth: "80%" }}
      />
      <BottomFixed>
        <BottomFixed.Button
          onClick={() => {
            if (name.length === 0) {
              onModal();
              return;
            }
            setProfile((profile) => ({
              request: { ...profile.request, name },
              file: profile.file,
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

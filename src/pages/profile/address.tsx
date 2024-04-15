import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";

import { BottomFixed } from "@/components/common/bottom-fixed";
import { Header } from "@/components/profile/header";
import { profileState } from "@/recoil/atoms/profile-state";
import { colorTheme } from "@/style/color-theme";

type AddressPageProps = {
  nextStep: () => void;
};

const ADDRESS = ["정릉1동", "정릉2동", "정릉3동", "정릉4동"];

export const AddressPage = ({ nextStep }: AddressPageProps) => {
  const [address, setAddress] = useState<string>();

  const setProfile = useSetRecoilState(profileState);

  useEffect(() => {
    if (address !== undefined) {
      setProfile((profile) => ({
        request: { ...profile.request, address },
        file: profile.file,
      }));
    }
  }, [address]);

  return (
    <ContentLayout>
      <Header text="현재 거주\n지역을 골라주세요!" />
      <AddressContainer>
        {ADDRESS.map((loc) => (
          <AddressCard
            key={loc}
            onClick={() => setAddress(loc)}
            $selected={loc === address}
          >
            {loc}
          </AddressCard>
        ))}
      </AddressContainer>
      <BottomFixed>
        <BottomFixed.Button color="orange" onClick={() => nextStep()}>
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
  margin-top: 10%;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;

const AddressContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const AddressCard = styled.div<{ $selected: boolean }>`
  flex: 1;
  display: flex;
  padding: 1.38rem;
  border: 2px solid ${colorTheme.blue700};
  border-radius: 1.6rem;
  background-color: white;
  color: ${colorTheme.blue700};
  font-size: 1.39rem;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
  ${({ $selected }) =>
    $selected && `background-color: ${colorTheme.blue700}; color: white;`}
`;

import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { styled } from "styled-components";

import { Header } from "@/components/profile/header";
import { profileState } from "@/recoil/atoms/profile-state";
import { colorTheme } from "@/style/color-theme";

type LocationPageProps = {
  nextStep: () => void;
};

const LOCATIONS = ["정릉1동", "정릉2동", "정릉3동", "정릉4동"];

export const LocationPage = ({ nextStep }: LocationPageProps) => {
  const [location, setLocation] = useState<string>();

  const setProfile = useSetRecoilState(profileState);

  useEffect(() => {
    if (location !== undefined) {
      setProfile((profile) => ({
        request: { ...profile.request, location },
        file: profile.file,
      }));
      setTimeout(() => {
        nextStep();
      }, 400);
    }
  }, [location]);

  return (
    <ContentLayout>
      <Header text="현재 거주\n지역을 골라주세요!" />
      <LocationContainer>
        {LOCATIONS.map((loc) => (
          <LocationCard
            key={loc}
            onClick={() => setLocation(loc)}
            $selected={loc === location}
          >
            {loc}
          </LocationCard>
        ))}
      </LocationContainer>
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

const LocationContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

const LocationCard = styled.div<{ $selected: boolean }>`
  flex: 1;
  display: flex;
  padding: 1.38rem;
  border: 1px solid ${colorTheme.orange400};
  border-radius: 1.6rem;
  background-color: white;
  color: ${colorTheme.orange400};
  font-size: 1.39rem;
  flex-direction: column;
  gap: 20px;
  text-align: center;
  ${({ $selected }) =>
    $selected && `background-color: ${colorTheme.orange400}; color: white;`}
`;

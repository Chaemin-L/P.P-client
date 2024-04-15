import { styled } from "styled-components";

import CameraSVG from "@/assets/icons/camera.svg";
import { Description as OriginDescription } from "@/components/profile/description";
import { Header } from "@/components/profile/header";

type PhotoDescriptionPageProps = {
  nextStep: () => void;
};

export const PhotoDescriptionPage = ({
  nextStep,
}: PhotoDescriptionPageProps) => {
  return (
    <ContentLayout>
      <Header text="프로필 사진을\n촬영해주세요!" />
      <div>
        <img width={158} src={CameraSVG} onClick={() => nextStep()} />
        <Description text="눌러서 촬영시작!" className="image-description" />
      </div>
    </ContentLayout>
  );
};

const ContentLayout = styled.div`
  display: flex;
  width: 100%;
  height: 90%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 100px;
`;

const Description = styled(OriginDescription)`
  color: #f17547;
  font-weight: 500;
`;

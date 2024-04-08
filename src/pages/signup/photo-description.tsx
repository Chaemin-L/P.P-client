import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

import CameraSVG from "@/assets/images/camera.svg";
import { Description as OriginDescription } from "@/components/signup/description";
import { Header } from "@/components/signup/header";

export const PhotoDescriptionPage = () => {
  const navigate = useNavigate();

  return (
    <ContentLayout>
      <Header text="프로필 사진을\n촬영해주세요!" />
      <div>
        <img
          width={158}
          src={CameraSVG}
          onClick={() => navigate("/signup/4")}
        />
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

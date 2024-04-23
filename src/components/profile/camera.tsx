import { Dispatch, SetStateAction } from "react";
import OriginCamera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { styled } from "styled-components";

type CameraProps = {
  setDataUri: Dispatch<SetStateAction<string>>;
};

const Camera = ({ setDataUri }: CameraProps) => {
  function handleTakePhoto(dataUri: string) {
    console.log("takePhoto");
    console.log(dataUri);
  }

  return (
    <CameraWrapper>
      <OriginCamera
        isImageMirror
        onTakePhotoAnimationDone={(dataUri: string) => {
          handleTakePhoto(dataUri);
          setDataUri(dataUri);
        }}
        imageType="jpg"
        imageCompression={0.5}
      />
    </CameraWrapper>
  );
};

export default Camera;

const CameraWrapper = styled.div`
  width: 100%;
  overflow: hidden;
  & .react-html5-camera-photo {
    width: 100%;
  }
  & video {
    width: 100%;
    height: 100%;
  }
  & img {
    width: 100% !important;
  }
  // 촬영 버튼
  & #container-circles {
    // 클릭시, margin 변경으로 인한 정렬 파괴 방지
    & .is-clicked {
      margin: -22px 0 0 -22px;
    }
  }
  & #outer-circle {
    background-color: #f17547;
  }

  & #inner-circle {
    position: absolute;
    width: 65px;
    height: 65px;
    left: 27px;
    top: 26px;

    &::after {
      position: absolute;
      content: "";
      width: 50px;
      height: 50px;
      left: 8px;
      top: 8px;
      background-color: #f17547;
      border-radius: 100%;
      z-index: 3;
      &:active {
      }
    }
  }
`;

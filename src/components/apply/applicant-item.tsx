import { styled } from "styled-components";

import { ApplicantItemDetailProps } from "./type";

import LocationSVG from "@/assets/icons/location.svg";
import { colorTheme } from "@/style/color-theme";

export const ApplicantItem = (props: ApplicantItemDetailProps) => {
  // const [profileImage, setProfileImage] = useState<string>();
  // useEffect(() => {
  //   // const blob = new Blob([props.applicantInfo.profileImage], {
  //   //   type: "image/png;base64",
  //   // });
  //   // const blobURL = URL.createObjectURL(blob);
  //   // setProfileImage(blobURL);
  //   // return () => URL.revokeObjectURL(blobURL);
  //   const reader = new FileReader();
  //   reader.readAsDataURL(new Blob([props.applicantInfo.profileImage]));
  //   reader.onload = () => {
  //     setProfileImage(reader.result as string);
  //   };
  // }, []);

  // console.log(profileImage);

  return (
    <ApplicantItemWrapper>
      <ApplicantImage>
        {/* <img src={profileImage} /> */}
        <img src={props.applicantInfo.profileImage} />
      </ApplicantImage>
      <ApplicantInfo>
        <ApplicantLocation>{props.applicantInfo.address}</ApplicantLocation>
        <ApplicantNickname>{props.applicantInfo.nickName}</ApplicantNickname>
        <ApplicantMoreInfo>
          도움횟수 16 <Bullet />{" "}
          {props.applicantInfo.gender === "male" ? "남" : "여"} <Bullet />{" "}
          {props.applicantInfo.ageRange * 10}대
        </ApplicantMoreInfo>
      </ApplicantInfo>
      <ApplyButton $selected={props.selected} onClick={props.onSelect}>
        {props.selected ? "선택됨" : "선택하기"}
      </ApplyButton>
    </ApplicantItemWrapper>
  );
};

const ApplicantItemWrapper = styled.div`
  height: 20%;
  display: flex;
  padding: 20px 25px;
  gap: 10px;
  border-top: 1px solid #e4e8f1;
`;

const ApplicantImage = styled.div`
  height: 100%;
  display: flex;
  position: relative;
  flex: 1.2;
  align-items: start;
  & img {
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 10px;
  }
`;

const ApplicantInfo = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 2px;
`;

const ApplicantLocation = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 0.83rem;
  &::before {
    width: 14px;
    height: 17px;
    border-radius: 1px;
    background-image: url(${LocationSVG});
    background-position: center;
    background-repeat: no-repeat;
    content: " ";
  }
`;

const ApplicantNickname = styled.div`
  color: ${colorTheme.blue900};
  font-size: 1.1rem;
  font-weight: 500;
`;

const ApplicantMoreInfo = styled.div`
  display: flex;
  gap: 4px;
  font-size: 0.72rem;
  align-items: center;
`;

const Bullet = styled.span`
  display: inline-block;
  width: 4px;
  height: 4px;
  background-color: black;
  border-radius: 50%;
`;

const ApplyButton = styled.button<{ $selected: boolean }>`
  flex: 1.1;
  display: flex;
  padding: 30px 10px;
  border: 0;
  border-radius: 15px;
  background-color: #e4e8f1;
  color: ${colorTheme.blue500};
  font-size: 0.8rem;
  justify-content: center;
  align-items: center;
  ${({ $selected }) =>
    $selected && `background-color: ${colorTheme.orange400};color: white`}
`;

import { styled } from "styled-components";

import knotIcon from "@/assets/icons/knot-icon.png";
import maleIcon from "@/assets/icons/male-icon.png";
import mapIcon from "@/assets/icons/map-icon.png";
import peopleIcon from "@/assets/icons/people-icon.png";
import { colorTheme } from "@/style/color-theme";

export const MypageListProfile = () => {
  return (
    <Wrapper>
      <ImgContainer>
        <Img />
      </ImgContainer>
      <ColumnBox>
        <ProfileRowBox>
          <Name></Name>
          <OtherStateIcon src={maleIcon} />
          <SexAge></SexAge>
        </ProfileRowBox>
        <StateOrangeBox>
          <PriceStateBox>
            <KnotIconImg src={knotIcon} />
            <KnotPriceState></KnotPriceState>
            <KnotPriceWon>매듭</KnotPriceWon>
          </PriceStateBox>
        </StateOrangeBox>
      </ColumnBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background-color: ${colorTheme.blue100};
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  padding: 26px 9% 26px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3.3%;
`;

const ImgContainer = styled.div`
  width: 20%;
  padding-top: 20%;
  position: relative;
  border-radius: 10px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  top: 0;
  position: absolute;
  border-radius: 10px;
`;

const ColumnBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

const ProfileRowBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 1%;
`;

const Name = styled.span`
  font-size: 1.38rem;
`;

const SexAge = styled.span`
  font-size: 0.56rem;
  color: ${colorTheme.shade};
`;

const StateOrangeBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  width: 100%;
  background-color: ${colorTheme.orange200};
  color: white;
  padding: 8px 4.5% 8px 8%;
`;

const PriceStateBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 2%;
`;

const KnotIconImg = styled.img`
  width: 25px;
  height: 25px;
`;

const KnotPriceState = styled.span`
  font-size: 1.38rem;
  font-weight: bold;
`;

const KnotPriceWon = styled.span`
  font-size: 0.72rem;
`;

const OtherStateColumnBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const OtherStateIcon = styled.img`
  width: 6px;
  height: 8px;
`;

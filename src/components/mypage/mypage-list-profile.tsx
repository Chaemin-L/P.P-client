import { styled } from "styled-components";

import knotIcon from "@/assets/icons/knot-icon.png";
import maleIcon from "@/assets/icons/male-icon.png";
import mapIcon from "@/assets/icons/map-icon.png";
import peopleIcon from "@/assets/icons/people-icon.png";
import { useGetBankData } from "@/hooks/queries/useGetBankData";
import { useGetProfile } from "@/hooks/queries/useGetProfile";
import { colorTheme } from "@/style/color-theme";

export const MypageListProfile = () => {
  const { data: myProfile } = useGetProfile();
  const { data: bankAccount } = useGetBankData();

  return (
    <Wrapper>
      <ProfileImg src={myProfile?.profileImage} />
      <ColumnBox>
        <ProfileRowBox>
          <Name>{myProfile?.nickName}</Name>
          <OtherStateIcon src={maleIcon} />
          <SexAge>
            {myProfile?.gender == "male" ? "남" : "여"} / {myProfile?.ageRange}
            대
          </SexAge>
        </ProfileRowBox>
        <StateOrangeBox>
          <PriceStateBox>
            <KnotIconImg src={knotIcon} />
            <KnotPriceState>{bankAccount?.totalBudget}</KnotPriceState>
            <KnotPriceWon>매듭</KnotPriceWon>
          </PriceStateBox>
          <OtherStateColumnBox>
            <PriceStateBox style={{ width: "5rem" }}>
              <OtherStateIcon src={mapIcon} />
              <div>{myProfile?.address}</div>
            </PriceStateBox>
            <PriceStateBox style={{ width: "5rem" }}>
              <OtherStateIcon src={peopleIcon} />
            </PriceStateBox>
          </OtherStateColumnBox>
        </StateOrangeBox>
      </ColumnBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  background-color: ${colorTheme.blue100};
  border-top-left-radius: 0.83rem;
  border-top-right-radius: 0.83rem;
  padding: 1.44rem 0 1.4rem 9%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3.3%;
`;

const ProfileImg = styled.img`
  width: 4.33rem;
  height: 4.33rem;
  border-radius: 0.56rem;
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

const Name = styled.div`
  font-size: 1.39rem;
`;

const SexAge = styled.div`
  font-size: 0.56rem;
  color: ${colorTheme.shade};
`;

const StateOrangeBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top-left-radius: 0.56rem;
  border-bottom-left-radius: 0.56rem;
  width: 100%;
  background-color: ${colorTheme.orange300};
  color: white;
  padding: 0.66rem 6% 0.66rem 4.5%;
`;

const PriceStateBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 3%;
`;

const KnotIconImg = styled.img`
  width: 1.39rem;
  height: 1.39rem;
`;

const KnotPriceState = styled.div`
  font-size: 1.39rem;
  font-weight: bold;
`;

const KnotPriceWon = styled.div`
  font-size: 0.722rem;
  width: 1.8rem;
`;

const OtherStateColumnBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.61rem;
`;

const OtherStateIcon = styled.img`
  width: 0.5rem;
  height: 0.68rem;
`;

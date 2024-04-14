import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { PostListItemProps } from "./type";

import calendarIcon from "@/assets/icons/calendar-icon.png";
import knotIcon from "@/assets/icons/knot-icon.png";
import mapIcon from "@/assets/icons/map-icon.png";
import peopleIcon from "@/assets/icons/people-icon.png";
import { colorTheme } from "@/style/color-theme";
import { BackdateToItemtype } from "@/utils/backdate-to-itemtype";

export const PostListItem = (props: PostListItemProps) => {
  const navigate = useNavigate();

  return (
    <Wrapper
      onClick={() => {
        navigate(`/post/${props.postId}`);
      }}
    >
      <RowBox>
        {props.status == "RECRUITING" && <StateIng>모집중</StateIng>}
        {props.status == "RECRUITEMNT_COMPLETED" && (
          <StateFin>모집완료</StateFin>
        )}
        {props.status == "TRANSACTION_COMPLETED" && (
          <StateFin>거래완료</StateFin>
        )}
        <TopIcon src={peopleIcon} />
        <StateSpan>
          {props.currentApplicant}/{props.maxNumOfPeople}명
        </StateSpan>
        <TopIcon src={knotIcon} />
        <StateSpan>{props.pay}매듭</StateSpan>
      </RowBox>
      <Title>{props.title}</Title>
      <RowBox>
        <BottomIcon src={mapIcon} />
        <StateSpan>{props.location}</StateSpan>
      </RowBox>
      <RowBox>
        <BottomIcon src={calendarIcon} />
        <StateSpan>{BackdateToItemtype(props.startDate)}</StateSpan>
      </RowBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 1.06rem 8.46%;
  border: 1px solid #d9d9d9;
  display: flex;
  flex-direction: column;
  border-left-width: 0;
  border-right-width: 0;
`;

const RowBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 0.3rem;
`;

const StateIng = styled.div`
  padding: 0.22rem 0.7rem;
  font-size: 1rem;
  color: white;
  background-color: ${colorTheme.orange400};
  border-radius: 0.44rem;
  line-height: 1.22rem;
`;

const StateFin = styled.div`
  font-size: 1rem;
  color: ${colorTheme.blue900};
  padding: 0.22rem 0.44rem;
`;

const Title = styled.span`
  width: 100%;
  font-size: 1.56rem;
  font-weight: bold;
  line-height: 2.22rem;
  margin: 0.39rem 0 1.11rem 0;
`;

const TopIcon = styled.img`
  padding: 0 7px 0 13px;
`;

const StateSpan = styled.span`
  font-size: 0.83rem;
`;

const BottomIcon = styled.img`
  padding-right: 14px;
`;

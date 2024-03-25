import { useRecoilState } from "recoil";
import { styled } from "styled-components";

import { activityState } from "@/recoil/atoms/activity-state";

type ActivityBoxProps = {
  status: boolean;
  category: string[];
  title: string;
  description: string;
  author: {
    id: number;
    name: string;
    imageUrl: string;
  };
  duration: number;
  datetime: string;
  location: string;
  members: number;
  maxMembers: number;
  visitor: number;
};

export const ActivityBox = ({
  status,
  category,
  title,
  description,
  author,
  duration,
  datetime,
  location,
  members,
  maxMembers,
  visitor,
}: ActivityBoxProps) => {
  return (
    <>
      <BadgeContainer>
        <Badge>{status ? "모집중" : "모집완료"}</Badge>
        {category.map((c) => (
          <Badge key={c}>{c}</Badge>
        ))}
      </BadgeContainer>

      <PostInfoContainer>
        <JustifyWrapper>
          <ProfileBadge>
            <ProfileImage src={author.imageUrl} />
            <ProfileName>{author.name}</ProfileName>
          </ProfileBadge>
          <Member>
            {members}/{maxMembers}명
          </Member>
        </JustifyWrapper>
        <PostDetail>
          <Title>{title}</Title>
          <p>{description}</p>
        </PostDetail>
      </PostInfoContainer>

      <MoreInfoContainer>
        <PromiseInfoList>
          <PromiseInfoItem>
            <span>{new Date(datetime).toLocaleDateString()}</span>
          </PromiseInfoItem>
          <PromiseInfoItem>
            <span>{location}</span>
          </PromiseInfoItem>
          <PromiseInfoItem>
            <span>예상 소요 시간 {duration}</span>
          </PromiseInfoItem>
        </PromiseInfoList>

        <span>조회수 {visitor}</span>
      </MoreInfoContainer>
    </>
  );
};

const BadgeContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const Badge = styled.div`
  width: fit-content;
  padding: 6px 11px;
  border-radius: 11px;
  background-color: black;
  color: white;
  font-size: 15px;
`;

const PostInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  margin-top: 10px;
  padding: 20px;
  background-color: black;
  border-radius: 20px;
`;

const JustifyWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProfileBadge = styled.div`
  display: flex;
  width: fit-content;
  padding: 6px 8px;
  align-items: center;
  background-color: white;
  border-radius: 11px;
`;

const ProfileImage = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 11px;
  object-fit: cover;
`;

const ProfileName = styled.div`
  padding: 4px 12px;
  text-align: center;
`;

const Member = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  color: white;
  &::before {
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 1px;
    background-image: url("https://img.freepik.com/free-photo/background_53876-32170.jpg?w=1380&t=st=1711331322~exp=1711331922~hmac=b3b85ba4a67da1f828dbddd65f5f91ad7db964bdcbfafe36701722f28611b632");
    content: " ";
  }
`;

const PostDetail = styled.p`
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: white;
`;

const Title = styled.h1`
  font-size: 30px;
  font-weight: 700;
`;

const MoreInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
  width: 100%;
  padding: 24px 22px 45px;
`;

const PromiseInfoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 13px;
`;

const PromiseInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
  &::before {
    width: 20px;
    height: 20px;
    border-radius: 1px;
    background-image: url("https://blog.kakaocdn.net/dn/bqPYzR/btraWSj02cT/HnIasx6vc09IszobY6Fwe0/img.jpg");
    content: " ";
  }
`;

/** buttons */
const CompleteButton = () => {
  const [_, setActivity] = useRecoilState(activityState);

  return (
    <>
      <button
        onClick={() =>
          setActivity((activity) => ({ ...activity, readOnly: true }))
        }
      >
        모집완료
      </button>
    </>
  );
};

const EditButton = () => {
  const [_, setActivity] = useRecoilState(activityState);

  return (
    <>
      <button
        onClick={() =>
          setActivity((activity) => ({
            ...activity,
            readOnly: !activity.readOnly,
          }))
        }
      >
        수정하기
      </button>
    </>
  );
};

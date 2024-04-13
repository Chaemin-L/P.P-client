import styled from "styled-components";

import { PostListItem } from "@/components/post/post-list-item";
import { useGetMypostList } from "@/hooks/queries/useGetMypostList";

export const MypageList = ({ type }: { type: string }) => {
  const { data } = useGetMypostList(type);

  return (
    <Wrapper>
      {data?.map((item, index) => (
        <PostListItem
          key={index}
          postId={item.postId}
          title={item.title}
          location={item.location}
          startDate={item.startDate}
          pay={item.pay}
          status={item.status}
          currentApplicant={item.currentApplicant}
          maxNumOfPeople={item.maxNumOfPeople}
        />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  /* overflow: auto; */
  width: 100%;
  height: 100%;
  background-color: white;
  display: flex;
  flex-direction: column;
`;

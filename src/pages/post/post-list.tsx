import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { PostListItem } from "@/components/post/post-list-item";
import { PostPostingButton } from "@/components/post/post-posting-button";
import { PostPostingButtonMini } from "@/components/post/post-posting-button-mini";
import { useGetPostList } from "@/hooks/queries/useGetPostList";

export const PostList = () => {
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [miniButtonVisible, setMiniButtonVisible] = useState(false);
  const { data } = useGetPostList();

  useEffect(() => {
    if (headerRef.current) setHeaderHeight(headerRef.current.offsetHeight);

    const handleScroll = () => {
      if (headerRef.current) {
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const isScrollingDown = scrollTop > headerHeight;
        setMiniButtonVisible(isScrollingDown);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headerHeight]);

  return (
    <Wrapper>
      <div style={{ width: "100%" }} ref={headerRef}>
        <BigHeader>전체게시물</BigHeader>
        <SmallHeader>
          게시글 만들기 버튼을 눌러 게시글을 만들어 보아요
        </SmallHeader>
        <PostPostingButton />
        {miniButtonVisible && <PostPostingButtonMini />}
      </div>
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
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  height: 100%;
`;

const BigHeader = styled.div`
  width: 100%;
  font-size: 32px;
  padding: 25px 9% 12px;
`;

const SmallHeader = styled.div`
  width: 100%;
  font-size: 15px;
  padding: 0 8.5% 10px;
`;

import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { styled } from "styled-components";

import { PostType } from "@/api/types/post-type";
import { ActivityBox } from "@/components/common/activity-box";
import { AppBar } from "@/components/common/app-bar";
import { BottomFixed } from "@/components/common/bottom-fixed";
import { DefaultLayout } from "@/components/layout/default-layout";
import { useEditPost } from "@/hooks/queries/useEditPost";
import { postState } from "@/recoil/atoms/post-state";

export const PostEditPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const post = useRecoilValue(postState);
  const { mutate } = useEditPost(postId!);

  useEffect(() => {
    // 새로고침을 통해 서버에서 받아온 게시글 데이터가 사라졌을 경우
    if (post.marketPostResponse.postId === -1)
      return navigate(`/post/${postId}`);
  }, []);

  return (
    <DefaultLayout
      appbar={
        <AppBar>
          <AppBar.AppBarNavigate>
            <AppBar.BackButton />
          </AppBar.AppBarNavigate>
        </AppBar>
      }
    >
      <PaddingWrapper>
        <ActivityBox
          editMode
          data={post.marketPostResponse as PostType}
        ></ActivityBox>
        <BottomFixed>
          <BottomFixed.Button
            onClick={() => {
              mutate();
            }}
          >
            수정완료
          </BottomFixed.Button>
        </BottomFixed>
      </PaddingWrapper>
    </DefaultLayout>
  );
};

const PaddingWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 0 1.6rem;
`;

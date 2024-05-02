import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { PostType } from "@/api/types/post-type";
import { ActivityBox } from "@/components/common/activity-box";
import { AppBar } from "@/components/common/app-bar";
import { BottomFixed } from "@/components/common/bottom-fixed";
import { DefaultLayout } from "@/components/layout/default-layout";
import { useEditPost } from "@/hooks/queries/useEditPost";
import { postState } from "@/recoil/atoms/post-state";

export const PostEditPage = () => {
  const { postId } = useParams();
  const post = useRecoilValue(postState);
  const { mutate } = useEditPost(postId!);

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
    </DefaultLayout>
  );
};

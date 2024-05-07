import { useParams } from "react-router-dom";

import { ApplicantList } from "./applicant-list";

import { AppBar } from "@/components/common/app-bar";
import { DefaultLayout } from "@/components/layout/default-layout";

export const ApplicantListPage = () => {
  const { postId } = useParams();
  return (
    <DefaultLayout
      scrollbar
      appbar={
        <AppBar isBorderExist>
          <AppBar.AppBarNavigate>
            <AppBar.BackButton />
            <AppBar.HeaderText isBigSizeText>참여관리</AppBar.HeaderText>
          </AppBar.AppBarNavigate>
        </AppBar>
      }
    >
      <ApplicantList postId={postId!} />
    </DefaultLayout>
  );
};

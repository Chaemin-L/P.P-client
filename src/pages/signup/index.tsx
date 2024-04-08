import { Outlet } from "react-router-dom";

import { DefaultLayout } from "@/components/layout/default-layout";

export const SignupPage = () => {
  return (
    <DefaultLayout appbar="">
      <Outlet />
    </DefaultLayout>
  );
};

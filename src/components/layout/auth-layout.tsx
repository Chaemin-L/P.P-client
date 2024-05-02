import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ProfileLayout } from "./profile-layout";

export const AuthLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) navigate("/error");
  }, []);

  return <ProfileLayout>{children}</ProfileLayout>;
};

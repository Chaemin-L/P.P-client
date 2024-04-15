import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProfileLayout = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  useEffect(() => {
    if (!role || role === "ROLE_TEMPORARY_USER") navigate("/profile");
  }, []);
  return <>{children}</>;
};

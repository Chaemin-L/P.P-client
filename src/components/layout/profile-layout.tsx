import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ProfileData } from "@/api/types/profile-type";
import { useGetProfile } from "@/hooks/queries/useGetProfile";

export const ProfileContext = createContext<ProfileData | null>(null);

export const ProfileLayout = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<ProfileData>({
    userId: 0,
    nickName: "",
    gender: "",
    address: "",
    ageRange: 0,
    accountNumber: "",
    profileImage: "",
    blocked: false,
  });

  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const { data } = useGetProfile();

  useEffect(() => {
    if (!role || role === "ROLE_TEMPORARY_USER") navigate("/profile/welcome");
    else setProfile(data!);
  }, []);

  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
};

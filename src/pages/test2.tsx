import { useEffect } from "react";

import { useSignInLocal } from "@/hooks/queries/useSignInLocal";

export const Test2 = () => {
  const signInMutate = useSignInLocal();

  useEffect(() => {
    localStorage.removeItem("accessToken");
    const handleGetKakaoToken = () => {
      try {
        signInMutate.mutate({
          email: "test2@email",
          password: "1234",
        });
      } catch (e) {
        console.error("로그인 실패", e);
      }
    };
    handleGetKakaoToken();
  }, []);

  return (
    <div>
      <span>로그인중..</span>
    </div>
  );
};

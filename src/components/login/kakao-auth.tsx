import { useEffect } from "react";

export const KakaoAuth = () => {
  const searchParams = new URLSearchParams(location.search);
  const kakaoAuthCode = searchParams.get("code");

  const handleGetToken = () => {
    // useGetToken hook
  };

  useEffect(() => {
    if (kakaoAuthCode) {
      handleGetToken();
    }
  }, [kakaoAuthCode]);

  return <div>Loading</div>;
};

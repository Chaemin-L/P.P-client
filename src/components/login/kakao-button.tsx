import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";

import { KakaoResponseType } from "./type";

export const KakaoButton = () => {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
  console.log();
  function handleKakaoLogin() {
    window.location.href = kakaoURL;
  }

  const searchParams = new URLSearchParams(location.search);
  const kakaoAuthCode = searchParams.get("code");

  const handleGetToken = async (code: string) => {
    try {
      const loginData: { [key: string]: string } = {
        grant_type: "authorization_code",
        client_id: process.env.REACT_APP_KAKAO_REST_API_KEY || "",
        redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI || "",
        code: code,
      };
      const queryString = Object.keys(loginData)
        .map(
          (k: string) =>
            encodeURIComponent(k) + "=" + encodeURIComponent(loginData[k]),
        )
        .join("&");

      const responseData: AxiosResponse<KakaoResponseType> = await axios.post(
        "https://kauth.kakao.com/oauth/token",
        queryString,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        },
      );

      localStorage.setItem("KakaoToken", responseData.data.access_token);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (kakaoAuthCode) {
      void handleGetToken(kakaoAuthCode);
    }
  }, [kakaoAuthCode]);

  return (
    <div>
      <button onClick={handleKakaoLogin}>Login</button>
    </div>
  );
};

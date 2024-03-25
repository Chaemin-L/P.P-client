import axios, { AxiosResponse } from "axios";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { KakaoResponseType } from "./type";

import { useSignIn } from "@/hooks/queries/useSignIn";

export const KakaoAuth = () => {
  const navigate = useNavigate();
  const location = useLocation(); // useLocation 훅 사용
  const signInMutate = useSignIn();

  const searchParams = new URLSearchParams(location.search);
  const kakaoAuthCode = searchParams.get("code");

  console.log("code", kakaoAuthCode);

  useEffect(() => {
    const handleGetKakaoToken = async (code: string) => {
      try {
        const responseData: AxiosResponse<KakaoResponseType> = await axios.post(
          "https://kauth.kakao.com/oauth/token",
          {
            grant_type: "authorization_code",
            client_id: process.env.REACT_APP_KAKAO_REST_API_KEY,
            redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
            code: code,
            client_secret: process.env.REACT_APP_KAKAO_CLIENT_SECRET,
          },
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          },
        );

        console.log("카카오 로그인 성공");

        localStorage.setItem("KakaoToken", responseData.data.access_token);

        signInMutate.mutate({
          type: "kakao",
          token: responseData.data.access_token,
        });
      } catch (e) {
        console.error("로그인 실패", e);
      }
    };

    if (kakaoAuthCode) {
      void handleGetKakaoToken(kakaoAuthCode);
    }
  }, []);

  return (
    <div>
      <span>로그인중..</span>
    </div>
  );
};

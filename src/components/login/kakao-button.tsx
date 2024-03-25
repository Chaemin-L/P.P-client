export const KakaoButton = () => {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
  console.log();
  function handleKakaoLogin() {
    window.location.href = kakaoURL;
  }

  return (
    <div>
      <button onClick={handleKakaoLogin}>Login</button>
    </div>
  );
};

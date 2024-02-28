export const KakaoButton = () => {
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REST_API_KEY}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code`;

  function handleKakaoLogin() {
    window.location.href = kakaoURL;
  }

  return (
    <div>
      <button onClick={handleKakaoLogin}>Login</button>
    </div>
  );
};

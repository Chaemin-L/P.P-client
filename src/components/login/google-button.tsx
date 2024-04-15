import { ReactComponent as GoogleLoginButtonSVG } from "@/assets/icons/google-login-button.svg";
import { useGoogleLogin } from "@/hooks/queries/useGoogleLogin";

export const GoogleButton = () => {
  const { isLoading, signIn, signOut, user, accessToken } = useGoogleLogin();

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <div style={{ width: "50vw" }} onClick={() => void signIn()}>
        <GoogleLoginButtonSVG />
      </div>
      {/* <button onClick={() => void signIn()}>Login</button>
      <button onClick={() => void signOut()}>Logout</button>
      <div>
        {!isLoading && user ? (
          <div>
            <>
              <br />
              Profile: <br />
              <img src={user.photoURL ?? ""} width={50} height={50} />
              <br />
              {user.displayName}님<br />
              {user.email},
              <br />
              <br />
              AccessToken:
              <br />
              {accessToken}
              <br />
              <br />
              RefreshToken:
              <br />
              {user.refreshToken}
            </>
          </div>
        ) : null}
      </div> */}
    </>
  );
};

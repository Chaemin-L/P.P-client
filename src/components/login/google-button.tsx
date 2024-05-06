import { GoogleAuthProvider, signInWithRedirect } from "@firebase/auth";
import { getRedirectResult } from "firebase/auth";
import { Dispatch, SetStateAction, useEffect } from "react";

import { ReactComponent as GoogleLoginButtonSVG } from "@/assets/icons/google-login-button.svg";
import { useSignIn } from "@/hooks/queries/useSignIn";
import { auth } from "@/lib/firebase";

export const GoogleButton = ({
  setIsLoading,
}: {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const { mutateAsync: signInBack } = useSignIn();

  const signIn = async () => {
    setIsLoading(true);
    sessionStorage.setItem("isLoading", "true");
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  };

  // // Not yet
  // const signOut = async () => {
  //   setIsLoading(true);
  //   await auth.signOut().then(() => console.log("logout!"));
  //   setIsLoading(false);
  // };

  useEffect(() => {
    void getRedirectResult(auth)
      .then(async function (result) {
        if (result?.user) {
          const token = await result.user.getIdToken();
          console.log("IdToken", token);
          await signInBack({ type: "firebase", token });
        } else {
          setIsLoading(false);
          sessionStorage.removeItem("isLoading");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <div
        style={{ width: "50vw", maxWidth: "200px" }}
        onClick={() => void signIn()}
      >
        <GoogleLoginButtonSVG />
      </div>
    </>
  );
};

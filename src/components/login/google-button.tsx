import {
  GoogleAuthProvider,
  signInWithRedirect,
  User as FirebaseUser,
} from "@firebase/auth";
import { getRedirectResult } from "firebase/auth";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { ReactComponent as GoogleLoginButtonSVG } from "@/assets/icons/google-login-button.svg";
import { useSignIn } from "@/hooks/queries/useSignIn";
import { auth } from "@/lib/firebase";

export const GoogleButton = ({
  setIsLoading,
}: {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const { mutateAsync: signInBack } = useSignIn();

  const signIn = async () => {
    setIsLoading(true);
    sessionStorage.setItem("isLoading", "true");
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  };

  // Not yet
  const signOut = async () => {
    setIsLoading(true);
    await auth.signOut().then(() => console.log("logout!", user));
    setIsLoading(false);
  };

  useEffect(() => {
    getRedirectResult(auth)
      .then(async function (result) {
        if (result?.user) {
          const token = await result.user.getIdToken();
          await signInBack({ type: "firebase", token });
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

import {
  GoogleAuthProvider,
  signInWithRedirect,
  User as FirebaseUser,
} from "@firebase/auth";
import { useEffect, useState } from "react";

import { useSignIn } from "./queries/useSignIn";

import { auth } from "@/lib/firebase";

export const useGoogleLogin = () => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string | null>(null); //temp
  const { mutate: signInBack } = useSignIn();

  const handleUser = async (user: FirebaseUser | null) => {
    if (user) {
      setUser(user);
      console.log(user);
      const ACCESS_TOKEN = await user
        .getIdToken()
        .then((res) => res.toString());

      console.log("ACCESS_TOKEN\n", ACCESS_TOKEN);
      console.log(user);
      signInBack({ type: "firebase", token: ACCESS_TOKEN });
    } else {
      setUser(null);
      setAccessToken(null);
    }

    setIsLoading(false);
  };

  const signIn = async () => {
    const provider = new GoogleAuthProvider();
    setIsLoading(true);
    await signInWithRedirect(auth, provider)
      .then((data) => {
        void handleUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsLoading(false);
  };

  const signOut = async () => {
    setIsLoading(true);
    await auth
      .signOut()
      .then(() => handleUser(null))
      .then(() => console.log("logout!", user));
    setIsLoading(false);
  };

  useEffect(() => {
    const unsubscribe = auth.onIdTokenChanged(
      (user: FirebaseUser | null) => void handleUser(user),
    );
    return () => unsubscribe();
  }, []);

  return { signIn, signOut, user, isLoading, accessToken };
};

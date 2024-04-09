import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { GlobalLayout } from "@/components/layout/global-layout";
import { GoogleAuth } from "@/components/login/google-auth";
import { KakaoAuth } from "@/components/login/kakao-auth";
import { Chat } from "@/pages/chat/chat";
import { ChatRoom } from "@/pages/chat/chat-room";
import { LoginPage } from "@/pages/login/login";
import { LoginEnd } from "@/pages/login/login-end";
import { Mypage } from "@/pages/mypage/mypage";
import { MyPostPage } from "@/pages/mypost";
import { ApplicantListPage } from "@/pages/mypost/applicant-list";
import { PostDetailPage } from "@/pages/post/post-detail";
import { PostList } from "@/pages/post/post-list";
import { Posting1 } from "@/pages/posting/posting1";
import { Posting2 } from "@/pages/posting/posting2";
import { Posting3 } from "@/pages/posting/posting3";
import { Posting4 } from "@/pages/posting/posting4";
import { Posting5 } from "@/pages/posting/posting5";
import { Posting6 } from "@/pages/posting/posting6";
import { Posting7 } from "@/pages/posting/posting7";
import { Posting8 } from "@/pages/posting/posting8";
import { SignupPage } from "@/pages/signup";
import { BirthdayPage } from "@/pages/signup/birthday";
import { DonePage } from "@/pages/signup/done";
import { GenderPage } from "@/pages/signup/gender";
import { NicknamePage } from "@/pages/signup/nickname";
import { PhotoDescriptionPage } from "@/pages/signup/photo-description";
import { TakePhotoPage } from "@/pages/signup/take-photo";
import { WelcomePage } from "@/pages/signup/welcome";
import { Test } from "@/pages/test";
import { Test2 } from "@/pages/test2";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      {
        path: "",
        element: <LoginPage />,
      },
      // {
      //   path: "auth/google",
      //   element: <GoogleAuth />,
      // },
      {
        path: "signup/",
        element: <SignupPage />,
        children: [
          {
            path: "",
            element: <WelcomePage />,
          },
          {
            path: "1",
            element: <NicknamePage />,
          },
          {
            path: "2",
            element: <GenderPage />,
          },
          {
            path: "3",
            element: <PhotoDescriptionPage />,
          },
          {
            path: "4",
            element: <TakePhotoPage />,
          },
          {
            path: "5",
            element: <BirthdayPage />,
          },
          {
            path: "6",
            element: <DonePage />,
          },
        ],
      },
      {
        path: "/post/:id",
        element: <PostDetailPage />,
      },
      {
        path: "/mypost/:id",
        element: <MyPostPage />,
      },
      {
        path: "/mypost/:id/applicant",
        element: <ApplicantListPage />,
      },
      { path: "/login/end", element: <LoginEnd /> },
      { path: "/auth/kakao", element: <KakaoAuth /> },
      {
        path: "posting/1",
        element: <Posting1 />,
      },
      {
        path: "posting/2",
        element: <Posting2 />,
      },
      {
        path: "posting/3",
        element: <Posting3 />,
      },
      {
        path: "posting/4",
        element: <Posting4 />,
      },
      {
        path: "posting/5",
        element: <Posting5 />,
      },
      {
        path: "posting/6",
        element: <Posting6 />,
      },
      {
        path: "posting/7",
        element: <Posting7 />,
      },
      {
        path: "posting/8",
        element: <Posting8 />,
      },
      {
        path: "/test",
        element: <Test />,
      },
      {
        path: "/test2",
        element: <Test2 />,
      },
      {
        path: "/chat/1",
        element: <ChatRoom />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/post",
        element: <PostList />,
      },
      {
        path: "/mypage",
        element: <Mypage />,
      },
    ],
  },
]);

export const Routers = () => {
  return <RouterProvider router={router} />;
};

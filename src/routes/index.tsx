import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthLayout } from "@/components/layout/auth-layout";
import { GlobalLayout } from "@/components/layout/global-layout";
import { KakaoAuth } from "@/components/login/kakao-auth";
import { Chat } from "@/pages/chat/chat";
import { ChatRoom } from "@/pages/chat/chat-room";
import { WrongAccessPage } from "@/pages/error/wrong-access";
import { LoginPage } from "@/pages/login";
import { Mypage } from "@/pages/mypage/mypage";
import { ApplicantListPage } from "@/pages/post/applicant-list-page";
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
import { ProfilePage } from "@/pages/profile";
import { DonePage } from "@/pages/profile/done";
import { WelcomePage } from "@/pages/profile/welcome";
import { Splash } from "@/pages/splash/splash";
import { Test2 } from "@/pages/test2";

const routeChildren = [
  {
    path: "",
    element: <Splash />,
    auth: false,
  },
  {
    path: "/login",
    element: <LoginPage />,
    auth: false,
  },
  { path: "/auth/kakao", element: <KakaoAuth /> },
  {
    path: "/profile",
    element: <ProfilePage />,
    auth: true,
  },
  {
    path: "/profile/welcome",
    element: <WelcomePage />,
    auth: true,
  },
  {
    path: "/profile/done/",
    element: <DonePage />,
    auth: true,
  },
  {
    path: "/post/:postId",
    element: <PostDetailPage />,
    auth: true,
  },
  {
    path: "/post/:postId/applicant",
    element: <ApplicantListPage />,
    auth: true,
  },
  {
    path: "posting/1",
    element: <Posting1 />,
    auth: true,
  },
  {
    path: "posting/2",
    element: <Posting2 />,
    auth: true,
  },
  {
    path: "posting/3",
    element: <Posting3 />,
    auth: true,
  },
  {
    path: "posting/4",
    auth: true,
    element: <Posting4 />,
  },
  {
    path: "posting/5",
    element: <Posting5 />,
    auth: true,
  },
  {
    path: "posting/6",
    element: <Posting6 />,
    auth: true,
  },
  {
    path: "posting/7",
    element: <Posting7 />,
    auth: true,
  },
  {
    path: "posting/8",
    element: <Posting8 />,
    auth: true,
  },
  { path: "/test2", element: <Test2 />, auth: true },
  {
    path: "/chat/detail",
    element: <ChatRoom />,
    auth: true,
  },
  {
    path: "/chat",
    element: <Chat />,
    auth: true,
  },
  {
    path: "/post",
    element: <PostList />,
    auth: true,
  },
  {
    path: "/mypage",
    element: <Mypage />,
    auth: true,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    errorElement: <WrongAccessPage />,
    children: routeChildren.map(({ path, element, auth }) => {
      if (auth) return { path, element: <AuthLayout>{element}</AuthLayout> };
      return { path, element };
    }),
  },
]);

export const Routers = () => {
  return <RouterProvider router={router} />;
};

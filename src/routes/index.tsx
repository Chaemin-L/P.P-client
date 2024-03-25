import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { GlobalLayout } from "@/components/layout/global-layout";
import { GoogleAuth } from "@/components/login/google-auth";
import { LoginPage } from "@/pages/login/login";
import { MyPostPage } from "@/pages/mypost";
import { PostDetailPage } from "@/pages/post/post-detail";
import { Test } from "@/pages/test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GlobalLayout />,
    children: [
      {
        path: "",
        element: <LoginPage />,
      },
      {
        path: "auth/google",
        element: <GoogleAuth />,
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
        path: "/test",
        element: <Test />,
      },
    ],
  },
]);

export const Routers = () => {
  return <RouterProvider router={router} />;
};

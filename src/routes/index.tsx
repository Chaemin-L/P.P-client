import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { GlobalLayout } from "@/components/layout/global-layout";
import { GoogleAuth } from "@/components/login/google-auth";
import { PostDetailPage } from "@/pages/board/post-detail";
import { LoginPage } from "@/pages/login/login";

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
        path: "/board/:postId",
        element: <PostDetailPage />,
      },
      {
        path: "auth/google",
        element: <GoogleAuth />,
      },
    ],
  },
]);

export const Routers = () => {
  return <RouterProvider router={router} />;
};

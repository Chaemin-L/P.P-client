import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { BottomNavigationBar } from "@/components/common/bottom-navigation-bar";
import globalRouter from "@/hooks/navigate/global-router";

export const GlobalLayout = () => {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;

  const location = useLocation();

  const [currentUrl, setCurrentUrl] = useState<string>("");

  function getCurrentPage(url: string): string {
    const path = url.split("/")[1];
    return path;
  }

  useEffect(() => {
    setCurrentUrl(getCurrentPage(location.pathname));
  }, [location.pathname]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          height:
            currentUrl == "" ||
            currentUrl == "post" ||
            currentUrl == "chat" ||
            currentUrl == "mypage"
              ? `calc(100% - 63px)`
              : "100%",
          position: "relative",
        }}
      >
        <Outlet />
      </div>
      {(currentUrl == "" ||
        currentUrl == "post" ||
        currentUrl == "chat" ||
        currentUrl == "mypage") && <BottomNavigationBar />}
    </div>
  );
};

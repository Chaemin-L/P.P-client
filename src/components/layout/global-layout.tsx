import { useEffect, useLayoutEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import { BottomNavigationBar } from "@/components/common/bottom-navigation-bar";
import globalRouter from "@/hooks/navigate/global-router";

export const GlobalLayout = () => {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;

  const location = useLocation();
  const [currentUrl, setCurrentUrl] = useState<string[]>([]);
  const [bottomBarHeight, setBottomBarHeight] = useState(0);

  useEffect(() => {
    setCurrentUrl(getCurrentPage(location.pathname));

    const bottomBar = document.getElementById("BottomNavigationBar");
    if (bottomBar) {
      const height = bottomBar.clientHeight;
      setBottomBarHeight(height);
      console.log(height);
    }
  }, [location.pathname]);

  function getCurrentPage(url: string): string[] {
    return url.split("/");
  }

  return (
    <div
      style={{
        width: "100dvw",
        height: "100dvh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          height:
            currentUrl[1] == "" ||
            currentUrl[1] == "post" ||
            (currentUrl[1] == "chat" && !currentUrl[2]) ||
            currentUrl[1] == "mypage"
              ? `calc(100% - ${bottomBarHeight}px)`
              : "100%",
          position: "relative",
        }}
      >
        <Outlet />
      </div>
      {(currentUrl[1] == "" ||
        currentUrl[1] == "post" ||
        (currentUrl[1] == "chat" && !currentUrl[2]) ||
        currentUrl[1] == "mypage") && <BottomNavigationBar />}
    </div>
  );
};

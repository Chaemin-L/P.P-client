import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { BottomNavigationBar } from "@/components/common/bottom-navigation-bar";
import globalRouter from "@/hooks/navigate/global-router";

export const GlobalLayout = () => {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;

  const [bottomBarHeight, setBottomBarHeight] = useState(0);

  useEffect(() => {
    const bottomBar = document.getElementById("BottomNavigationBar");
    if (bottomBar) {
      const height = bottomBar.clientHeight;
      setBottomBarHeight(height);
    }
  }, []);

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
          height: `calc(100% - ${bottomBarHeight}px)`,
          position: "relative",
        }}
      >
        <Outlet />
      </div>
      <BottomNavigationBar />
    </div>
  );
};

import { Outlet, useNavigate } from "react-router-dom";
import globalRouter from "../../hooks/navigate/global-router";

export const GlobalLayout = () => {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;

  return (
    <>
      <Outlet />
    </>
  );
};

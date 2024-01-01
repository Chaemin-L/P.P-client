import { Outlet } from "react-router-dom";

export const GlobalLayout = () => {
  return (
    <main className="w-full h-full">
      <Outlet />
    </main>
  );
};

import { Outlet } from "react-router-dom";
import { MainNavbar } from "../../components/MainNavbar";

export function RootLayout() {
  return (
    <>
      <MainNavbar />
      <Outlet />
    </>
  );
}

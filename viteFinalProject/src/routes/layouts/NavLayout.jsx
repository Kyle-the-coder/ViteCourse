import { Outlet } from "react-router-dom";
import { MainNavbar } from "../../navbars/MainNavbar";

export function NavLayout() {
  return (
    <>
      <MainNavbar />
      <Outlet />
    </>
  );
}

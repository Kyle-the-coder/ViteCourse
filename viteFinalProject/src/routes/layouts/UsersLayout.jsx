import { Outlet } from "react-router-dom";
import { MainNavbar } from "../../navbars/MainNavbar";

export function UsersLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

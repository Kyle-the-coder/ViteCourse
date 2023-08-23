import { Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export function UsersLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}

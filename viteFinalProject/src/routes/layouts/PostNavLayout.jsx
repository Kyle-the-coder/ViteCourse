import { Navbar } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export function PostNavLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

import { Navbar } from "../../Navbar";
import { Outlet } from "react-router-dom";
export function NavLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

import { Navbar } from "../../navbars/Navbar";
import { Outlet } from "react-router-dom";
export function NavLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

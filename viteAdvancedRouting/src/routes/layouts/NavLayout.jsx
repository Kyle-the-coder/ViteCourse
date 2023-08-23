import { Navbar } from "../../navbars/Navbar";
import { Outlet, useNavigation } from "react-router-dom";
export function NavLayout() {
  const { state } = useNavigation();
  return (
    <>
      <Navbar />
      {state === "loading" ? "loading..." : <Outlet />}
    </>
  );
}

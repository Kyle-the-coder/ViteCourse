import { Outlet, useNavigation } from "react-router-dom";
import { MainNavbar } from "../../navbars/MainNavbar";

export function NavLayout() {
  const { state } = useNavigation();
  return (
    <>
      <MainNavbar />
      {state === "loading" ? (
        <>
          <div className="loading-spinner"></div>
          <div className="container loading">
            <Outlet />
          </div>
        </>
      ) : (
        <Outlet />
      )}
    </>
  );
}

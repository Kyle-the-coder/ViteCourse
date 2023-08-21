import { Outlet } from "react-router-dom";
import { TeamNav } from "../../TeamNav";

export function TeamNavLayout() {
  return (
    <>
      <TeamNav />
      <Outlet />
    </>
  );
}

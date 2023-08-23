import { Outlet } from "react-router-dom";
import { TeamNav } from "../../navbars/TeamNav";

export function TeamNavLayout() {
  return (
    <>
      <TeamNav />
      <Outlet context="Hi from outlet" />
    </>
  );
}

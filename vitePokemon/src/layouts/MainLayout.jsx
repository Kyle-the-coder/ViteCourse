import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import "../styles/styles.css";

export function MainLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

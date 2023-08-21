import { createBrowserRouter, Outlet } from "react-router-dom";
import { Home } from "../pages/Home";
import { Store } from "../pages/Store";
import { About } from "../pages/About";
import { NavLayout } from "./layouts/NavLayout";
import { Team } from "../pages/Team";

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/store", element: <Store /> },
      { path: "/about", element: <About /> },
      { path: "/team", element: <Team /> },
      { path: "/team/joe", element: <TeamMember name="joe" /> },
      { path: "/team/sally", element: <TeamMember name="sally" /> },
    ],
  },
]);

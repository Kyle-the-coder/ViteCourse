import { createBrowserRouter, Outlet } from "react-router-dom";
import { Home } from "../pages/Home";
import { Store } from "../pages/Store";
import { About } from "../pages/About";
import { NavLayout } from "./layouts/NavLayout";
import { Team } from "../pages/Team";
import { TeamMember } from "../pages/TeamMember";
import { TeamNavLayout } from "./layouts/TeamNavLayout";

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/store", element: <Store /> },
      { path: "/about", element: <About /> },
      {
        element: <TeamNavLayout />,
        children: [
          {
            path: "/team",
            children: [
              { index: true, element: <Team /> },
              { path: "joe", element: <TeamMember name="joe" /> },
              { path: "sally", element: <TeamMember name="sally" /> },
            ],
          },
        ],
      },
    ],
  },
]);

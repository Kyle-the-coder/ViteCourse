import { createBrowserRouter } from "react-router-dom";
import { Home } from "../pages/Home";
import { Store } from "../pages/Store";
import { About } from "../pages/About";
import { NavLayout } from "./layouts/NavLayout";
import { Team } from "../pages/Team";
import { TeamMember } from "../pages/TeamMember";
import { TeamNavLayout } from "./layouts/TeamNavLayout";
import { NewTeamMember } from "../pages/NewTeamMember";

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    errorElement: <h1>Error</h1>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/store", element: <Store /> },
      { path: "/about", element: <About /> },
      {
        path: "/team",
        element: <TeamNavLayout />,
        children: [
          { index: true, element: <Team /> },
          { path: ":memberId", element: <TeamMember /> },
          { path: "new", element: <NewTeamMember /> },
        ],
      },
    ],
  },
]);

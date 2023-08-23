import { createBrowserRouter, Navigate, redirect } from "react-router-dom";
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
      { path: "/test/*", element: <Navigate to="/" /> },
      { path: "/store", element: <Store /> },
      { path: "/about", element: <About /> },
      {
        path: "/team",
        element: <TeamNavLayout />,
        loader: ({ request: { signal } }) => {
          return fetch("https://jsonplaceholder.typicode.com/users", {
            signal,
          });
        },
        children: [
          { index: true, element: <Team /> },
          {
            path: ":memberId",
            loader: ({ params, request: { signal } }) => {
              return fetch(
                `https://jsonplaceholder.typicode.com/users/${params.memberId}`,
                {
                  signal,
                }
              ).then((res) => {
                if (res.status === 200) return res.json();

                throw redirect("/team");
              });
            },
            element: <TeamMember />,
          },
          { path: "new", element: <NewTeamMember /> },
        ],
      },
    ],
  },
]);

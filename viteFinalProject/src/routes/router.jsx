import { createBrowserRouter, Navigate } from "react-router-dom";
import { Posts } from "../pages/Posts";
import { Todos } from "../pages/Todos";
import { Users } from "../pages/Users";
import { NavLayout } from "./layouts/NavLayout";

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    loader: ({ params }) => {
      if (Object.keys(params).length <= 0) {
        return <Navigate to="/posts" />;
      }
      return null;
    },
    children: [
      { path: "/posts", element: <Posts /> },
      { path: "/users", element: <Users /> },
      { path: "/todos", element: <Todos /> },
    ],
  },
]);

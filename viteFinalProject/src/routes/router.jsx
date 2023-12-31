import { createBrowserRouter, Navigate } from "react-router-dom";
import { ErrorPage } from "../pages/ErrorPage";
import { Post } from "../pages/Post";
import { Posts } from "../pages/Posts";
import { Todos } from "../pages/Todos";
import { User } from "../pages/User";
import { Users } from "../pages/Users";
import { NavLayout } from "./layouts/NavLayout";
import { UsersLayout } from "./layouts/UsersLayout";

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Navigate to="/posts" /> },
      {
        path: "/posts",
        element: <Posts />,
        loader: () => {
          return fetch("http://127.0.0.1:3000/posts");
        },
      },
      {
        path: "/post/:postId",
        element: <Post />,
        loader: ({ params }) => {
          return fetch(`http://127.0.0.1:3000/posts/${params.postId}`);
        },
      },
      {
        path: "/users",
        element: <UsersLayout />,
        children: [
          {
            index: true,
            element: <Users />,
            loader: () => {
              return fetch("http://127.0.0.1:3000/users");
            },
          },
          {
            path: ":userId",
            element: <User />,
            loader: ({ params }) => {
              return fetch(`http://127.0.0.1:3000/users/${params.userId}`);
            },
          },
        ],
      },

      {
        path: "/todos",
        element: <Todos />,
        loader: () => {
          return fetch(`http://127.0.0.1:3000/todos`);
        },
      },
    ],
  },
]);

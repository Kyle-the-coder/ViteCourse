import { createBrowserRouter, Navigate } from "react-router-dom";
import { postRoute } from "../pages/Post";
import { postListRoute } from "../pages/PostList";
import { todoListRoute } from "../pages/TodoList";
import { userListRoute } from "../pages/UserList";
import { RootLayout } from "./layouts/RootLayout";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="posts" /> },
      {
        path: "posts",
        children: [
          {
            index: true,
            ...postListRoute,
          },
          { path: ":postId", ...postRoute },
        ],
      },
      {
        path: "users",
        children: [
          { index: true, ...userListRoute },
          { path: ":userId", element: <h1>hello user</h1> },
        ],
      },
      {
        path: "todos",
        children: [
          { index: true, ...todoListRoute },
          { path: ":todoId", element: <h1>hello from todo</h1> },
        ],
      },
    ],
  },
]);

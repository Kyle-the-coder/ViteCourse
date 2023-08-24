import { createBrowserRouter, Navigate } from "react-router-dom";
import { PostList } from "../pages/PostList";
import { TodoList } from "../pages/TodoList";
import { UserList } from "../pages/UserList";
import { RootLayout } from "./layouts/RootLayout";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="posts" /> },
      { path: "posts", element: <PostList /> },
      { path: "users", element: <UserList /> },
      { path: "todos", element: <TodoList /> },
    ],
  },
]);

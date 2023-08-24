import { createBrowserRouter } from "react-router-dom";
import { PostList, Posts } from "../pages/PostList";
import { TodoList } from "../pages/TodoList";
import { UserList } from "../pages/UserList";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "posts", element: <PostList /> },
      { path: "users", element: <UserList /> },
      { path: "todos", element: <TodoList /> },
    ],
  },
]);

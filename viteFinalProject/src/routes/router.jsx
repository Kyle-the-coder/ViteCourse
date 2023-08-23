import { createBrowserRouter } from "react-router-dom";
import { NavLayout } from "./layouts/NavLayout";

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    errorElement: <h1>error</h1>,
    children: [
      { path: "/posts", element: <PostPage /> },
      { path: "/users", element: <UsersPage /> },
      { path: "/todos", element: <TodosPage /> },
    ],
  },
]);

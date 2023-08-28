import { createBrowserRouter, Navigate, useRouteError } from "react-router-dom";
import { newPostRoute } from "../pages/NewPost";
import { postRoute } from "../pages/Post";
import { postListRoute } from "../pages/PostList";
import { todoListRoute } from "../pages/TodoList";
import { userRoute } from "../pages/User";
import { userListRoute } from "../pages/UserList";
import { RootLayout } from "./layouts/RootLayout";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        errorElement: <ErrorPage />,
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
              { path: "new", ...newPostRoute },
            ],
          },
          {
            path: "users",
            children: [
              { index: true, ...userListRoute },
              { path: ":userId", ...userRoute },
            ],
          },
          {
            path: "todos",
            children: [{ index: true, ...todoListRoute }],
          },
          { path: "*", element: <h1>404 page not found</h1> },
        ],
      },
    ],
  },
]);

function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <h1>error- something went Wrong</h1>
      {import.meta.env.MODE !== "production" && (
        <>
          <pre>{error.message}</pre>
          <pre>{error.stack}</pre>
        </>
      )}
    </>
  );
}

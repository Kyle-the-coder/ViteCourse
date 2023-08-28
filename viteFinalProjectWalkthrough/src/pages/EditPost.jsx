import { useLoaderData } from "react-router-dom";
import { PostForm } from "../components/PostForm";
import { getUsers } from "../hooks/getUsers";

function EditPost() {
  const users = useLoaderData();
  return (
    <>
      <h1 className="page-title">New Post</h1>
      <PostForm users={users} />
    </>
  );
}

function loader({ request: { signal } }) {
  return getUsers({ signal });
}
function action() {}

export const editPostRoute = {
  loader,
  action,
  element: <EditPost />,
};

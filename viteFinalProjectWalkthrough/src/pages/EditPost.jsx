import { PostForm } from "../components/PostForm";

function EditPost() {
  return <PostForm></PostForm>;
}

function loader() {}
function action() {}

export const editPostRoute = {
  loader,
  action,
  element: <EditPost />,
};

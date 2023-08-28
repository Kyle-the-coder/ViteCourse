import { Form, redirect, useLoaderData } from "react-router-dom";
import { FormGroup } from "../components/FormGroup";
import { PostForm } from "../components/PostForm";
import { createPost } from "../hooks/getPosts";
import { getUsers } from "../hooks/getUsers";

function NewPost() {
  const users = useLoaderData();
  return (
    <>
      <h1 className="page-title">New Post</h1>
      <PostForm users={users} />
    </>
  );
}

async function action({ request }) {
  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");
  const userId = formData.get("userId");

  const post = await createPost(
    { title, body, userId },
    { signal: request.signal }
  );
  return redirect(`/posts/${post.id}`);
}

function loader({ request: { signal } }) {
  return getUsers({ signal });
}

export const newPostRoute = {
  loader,
  action,
  element: <NewPost />,
};

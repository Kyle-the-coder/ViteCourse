import {
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { PostForm, PostFormValidator } from "../components/PostForm";
import { editPost, getPost } from "../hooks/getPosts";
import { getUsers } from "../hooks/getUsers";

function EditPost() {
  const { users, post } = useLoaderData();
  const { state } = useNavigation();
  const errors = useActionData();
  const isSubmitting = state === "submitting";
  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <PostForm
        users={users}
        defaultValues={post}
        isSubmitting={isSubmitting}
        errors={errors}
      />
    </>
  );
}

async function loader({ request: { signal }, params: { postId } }) {
  const post = getPost(postId, { signal });
  const users = getUsers({ signal });
  return { post: await post, users: await users };
}
async function action({ request, params: { postId } }) {
  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");
  const userId = formData.get("userId");

  const errors = PostFormValidator({ title, userId, body });

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const post = await editPost(
    postId,
    { title, body, userId },
    { signal: request.signal }
  );
  return redirect(`/posts/${post.id}`);
}

export const editPostRoute = {
  loader,
  action,
  element: <EditPost />,
};

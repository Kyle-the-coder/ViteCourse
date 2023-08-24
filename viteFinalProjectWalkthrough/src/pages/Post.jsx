import { getPost } from "../hooks/getPosts";
import { useLoaderData } from "react-router-dom";

function Post() {
  const post = useLoaderData();
  return <h1>{post.title}</h1>;
}

function loader({ request: { signal }, params }) {
  return getPost(params.postId, { signal });
}

export const postRoute = {
  loader,
  element: <Post />,
};

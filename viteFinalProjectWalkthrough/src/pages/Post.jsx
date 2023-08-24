import { getPost } from "../hooks/getPosts";
import { useParams } from "react-router-dom";

function Post() {
  return <h1>single post</h1>;
}

function loader({ request: signal }) {
  const postId = useParams();
  getPost({ signal: signal, postId: postId });
}

export const postRoute = {
  loader,
  element: <Post />,
};

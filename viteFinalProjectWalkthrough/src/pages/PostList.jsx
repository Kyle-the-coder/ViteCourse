import axios from "axios";
import { useLoaderData } from "react-router-dom";

function PostList() {
  const posts = useLoaderData();
  return <div>Hello from posts {posts.length}</div>;
}

function loader({ request: { signal } }) {
  return axios
    .get("http://localhost:3000/posts", { signal })
    .then((res) => res.data);
}

export const postListRoute = {
  loader,
  element: <PostList />,
};

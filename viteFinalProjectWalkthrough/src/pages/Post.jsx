import { getPost } from "../hooks/getPosts";
import { useLoaderData } from "react-router-dom";

function Post() {
  const post = useLoaderData();
  return (
    <>
      {" "}
      <h1 className="page-title">{post.title}</h1>
      <span className="page-subtitle">
        By: <a href="user.html">{post.name}</a>
      </span>
      <div>{post.body}</div>
      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        <div className="card">
          <div className="card-body">
            <div className="text-sm mb-1">Eliseo@gardner.biz</div>
            laudantium enim quasi est quidem magnam voluptate ipsam eos tempora
            quo necessitatibus dolor quam autem quasi reiciendis et nam sapiente
            accusantium
          </div>
        </div>
      </div>
    </>
  );
}

function loader({ request: { signal }, params }) {
  return getPost(params.postId, { signal });
}

export const postRoute = {
  loader,
  element: <Post />,
};

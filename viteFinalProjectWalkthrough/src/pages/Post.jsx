import { getPost } from "../hooks/getPosts";
import { useLoaderData } from "react-router-dom";
import { getComments } from "../hooks/getComments";

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

async function loader({ request: { signal }, params }) {
  const post = getPost(params.postId, { signal });
  const comments = await getComments(params.postId, { signal });
  const user = getUser(post.userId, { signal });
  return { comments: await comments, post, user: await user };
}

export const postRoute = {
  loader,
  element: <Post />,
};

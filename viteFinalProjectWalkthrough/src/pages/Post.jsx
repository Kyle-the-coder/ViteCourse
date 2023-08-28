import { getPost } from "../hooks/getPosts";
import { useLoaderData } from "react-router-dom";
import { getComments } from "../hooks/getComments";
import { Link } from "react-router-dom";
import { getUser } from "../hooks/getUsers";

function Post() {
  const { comments, user, post } = useLoaderData();

  return (
    <>
      {" "}
      <h1 className="page-title">
        {post.title}
        <div className="title-btns">
          <Link className="btn btn-outline" to="edit">
            Edit
          </Link>
        </div>
      </h1>
      <span className="page-subtitle">
        By: <Link to={`/users/${user.id}`}>{user.name}</Link>
      </span>
      <div>{post.body}</div>
      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        {comments.map((comment) => {
          return (
            <div className="card" key={comment.id}>
              <div className="card-body">
                <div className="text-sm mb-1">{comment.email}</div>
                {comment.body}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

async function loader({ request: { signal }, params }) {
  const post = await getPost(params.postId, { signal });
  const comments = getComments(params.postId, { signal });
  const user = getUser(post.userId, { signal });
  return { comments: await comments, post, user: await user };
}

export const postRoute = {
  loader,
  element: <Post />,
};

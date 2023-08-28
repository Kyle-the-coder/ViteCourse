import axios from "axios";
import { useLoaderData, Link } from "react-router-dom";
import { getPosts } from "../hooks/getPosts";

function PostList() {
  const posts = useLoaderData();

  return (
    <>
      {" "}
      <h1 className="page-title">
        Posts
        <div className="title-btns">
          <a className="btn btn-outline" href="/posts/new">
            New
          </a>
        </div>
      </h1>
      <div className="card-grid">
        {posts.map((post) => {
          return (
            <div className="card" key={post.id}>
              <div className="card-header">{post.title}</div>
              <div className="card-body">
                <div className="card-preview-text">{post.body}</div>
              </div>
              <div className="card-footer">
                <Link className="btn" to={`/posts/${post.id}`}>
                  View
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

function loader({ request: { signal } }) {
  return getPosts({ signal });
}

export const postListRoute = {
  loader,
  element: <PostList />,
};

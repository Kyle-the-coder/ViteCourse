import { useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";

export function Posts() {
  const postsInfo = useLoaderData();

  return (
    <div className="container">
      <h1 className="page-title">Posts</h1>
      <div className="card-grid">
        {postsInfo !== undefined &&
          postsInfo.map((post) => (
            <div className="card" key={post.id}>
              <div className="card-header">{post.title}</div>
              <div className="card-body">
                <div className="card-preview-text">{post.body}</div>
              </div>
              <div className="card-footer">
                <Link className="btn" to={`/post/${post.id}`}>
                  View
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

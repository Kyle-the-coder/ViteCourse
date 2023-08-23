import { Link, useLoaderData } from "react-router-dom";

export function Posts() {
  const PostsInfo = useLoaderData();
  return (
    <div className="container">
      <h1 className="page-title">Posts</h1>
      <div className="card-grid">
        {PostsInfo.map((post) => (
          <div className="card" id={post.id}>
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
        ))}
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";

export function Posts() {
  return (
    <div className="container">
      <h1 className="page-title">Posts</h1>
      <div className="card-grid">
        <div className="card">
          <div className="card-header">
            sunt aut facere repellat provident occaecati excepturi optio
            reprehenderit
          </div>
          <div className="card-body">
            <div className="card-preview-text">
              quia et suscipit suscipit recusandae consequuntur expedita et cum
              reprehenderit molestiae ut ut quas totam nostrum rerum est autem
              sunt rem eveniet architecto
            </div>
          </div>
          <div className="card-footer">
            <Link className="btn" to="/posts/234">
              View
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-header">qui est esse</div>
          <div className="card-body">
            <div className="card-preview-text">
              est rerum tempore vitae sequi sint nihil reprehenderit dolor
              beatae ea dolores neque fugiat blanditiis voluptate porro vel
              nihil molestiae ut reiciendis qui aperiam non debitis possimus qui
              neque nisi nulla
            </div>
          </div>
          <div className="card-footer">
            <a className="btn" href="post.html">
              View
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

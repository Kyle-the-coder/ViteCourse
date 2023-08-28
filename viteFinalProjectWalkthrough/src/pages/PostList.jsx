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
          <Link className="btn btn-outline" to="new">
            New
          </Link>
        </div>
      </h1>
      <form method="get" action="/posts" class="form mb-4">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="query">Query</label>
            <input type="search" name="query" id="query" />
          </div>
          {/* <div className="form-group">
            <label for="userId">Author</label>
            <select type="search" name="userId" id="userId">
              <option value="">Any</option>
              <option value="1">Leanne Graham</option>
              <option value="2">Ervin Howell</option>
              <option value="3">Clementine Bauch</option>
              <option value="4">Patricia Lebsack</option>
              <option value="5">Chelsey Dietrich</option>
              <option value="6">Mrs. Dennis Schulist</option>
              <option value="7">Kurtis Weissnat</option>
              <option value="8">Nicholas Runolfsdottir V</option>
              <option value="9">Glenna Reichert</option>
              <option value="10">Clementina DuBuque</option>
            </select>
          </div> */}
          <button className="btn">Filter</button>
        </div>
      </form>
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

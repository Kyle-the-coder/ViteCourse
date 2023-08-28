import axios from "axios";
import { useEffect, useRef } from "react";
import { useLoaderData, Link, Form } from "react-router-dom";
import { FormGroup } from "../components/FormGroup";
import { getPosts } from "../hooks/getPosts";
import { getUsers } from "../hooks/getUsers";
import { userListRoute } from "./UserList";

function PostList() {
  const {
    posts,
    users,
    searchParams: { query },
  } = useLoaderData();
  const queryRef = useRef();

  useEffect(() => {
    queryRef.current.value = query;
  }, [query]);

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
      <Form className="form mb-4">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="query">Query</label>
            <input type="search" name="query" id="query" ref={queryRef} />
          </div>
          <div className="form-group">
            <label for="userId">Author</label>
            <select type="search" name="userId" id="userId" ref={userId}>
              <option value="">Any</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <button className="btn">Filter</button>
        </div>
      </Form>
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

async function loader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get("query");
  const filterParams = { q: query };
  const posts = getPosts({ signal, params: filterParams });
  const users = getUsers({ signal });
  return { searchParams: { query }, posts: await posts, users: await users };
}

export const postListRoute = {
  loader,
  element: <PostList />,
};

import { getUser } from "../hooks/getUsers";
import { Link, useLoaderData } from "react-router-dom";
import { getTodos } from "../hooks/getTodos";
import { getPosts } from "../hooks/getPosts";

function User() {
  const { user, posts, todos } = useLoaderData();
  console.log(todos);
  return (
    <>
      <h1 className="page-title">{user.name}</h1>
      <div className="page-subtitle">{user.email}</div>
      <div>
        <b>Company:</b> {user.company.name}
      </div>
      <div>
        <b>Website:</b> {user.website}
      </div>
      <div>
        <b>Address:</b> {user.address.street}, {user.address.suite},{" "}
        {user.address.city}, {user.address.zipcode}
      </div>
      <h3 className="mt-4 mb-2">Posts</h3>
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
      <h3 className="mt-4 mb-2">Todos</h3>
      <ul>
        {todos.map((todo) => {
          return (
            <li
              key={todo.id}
              className={`${todo.completed && "strike-through"}`}
            >
              {todo.title}
            </li>
          );
        })}
      </ul>
    </>
  );
}

async function loader({ request: { signal }, params: { userId } }) {
  const user = getUser(userId, { signal });
  const todos = getTodos({ signal, params: { userId } });
  const posts = getPosts({ signal, params: { userId } });
  return { posts: await posts, todos: await todos, user: await user };
}

export const userRoute = {
  loader,
  element: <User />,
};

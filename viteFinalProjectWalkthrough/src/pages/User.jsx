import { getUser } from "../hooks/getUsers";
import { useLoaderData } from "react-router-dom";
import { getTodo, getTodos } from "../hooks/getTodos";

function User() {
  const user = useLoaderData();
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
            <a className="btn" href="posts.html">
              View
            </a>
          </div>
        </div>
      </div>
      <h3 className="mt-4 mb-2">Todos</h3>
      <ul>
        <li>delectus aut autem</li>
      </ul>
    </>
  );
}

function loader({ request: { signal }, params }) {
  const user = getUser(params.userId, { signal });
  const todos = getTodo(params.userId, { signal });
}

export const userRoute = {
  loader,
  element: <User />,
};

import axios from "axios";
import { Link } from "react-router-dom";
import { useLoaderData } from "react-router-dom";
import { getUsers } from "../hooks/getUsers";
function UserList() {
  const users = useLoaderData();
  return (
    <>
      <h1 className="page-title">Users</h1>
      <div className="card-grid">
        {users.map((user) => {
          return (
            <div className="card" key={user.id}>
              <div className="card-header">{user.name}</div>
              <div className="card-body">
                <div>{user.userName}</div>
                <div>{user.website}</div>
                <div>{user.email}</div>
              </div>
              <div className="card-footer">
                <Link className="btn" to={`${user.id}`}>
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
  return getUsers({ signal });
}

export const userListRoute = {
  loader,
  element: <UserList />,
};

import { useLoaderData } from "react-router-dom";
import { Link } from "react-router-dom";

export function Users() {
  const usersInfo = useLoaderData();
  console.log(usersInfo);
  return (
    <div className="container">
      <h1 className="page-title">Users</h1>
      <div className="card-grid">
        {usersInfo.map((user) => {
          return (
            <div className="card" key={user.id}>
              <div className="card-header">{user.name}</div>
              <div className="card-body">
                <div>{user.username}</div>
                <div>{user.website}</div>
                <div>{user.email}</div>
              </div>
              <div className="card-footer">
                <Link className="btn" to={`/users/${user.id}`}>
                  View
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useLoaderData } from "react-router-dom";

export function Users() {
  const usersInfo = useLoaderData();

  return (
    <div className="container">
      <h1 className="page-title">Users</h1>
      <div className="card-grid">
        <div className="card">
          <div className="card-header">Leanne Graham</div>
          <div className="card-body">
            <div>Romaguera-Crona</div>
            <div>hildegard.org</div>
            <div>Sincere@april.biz</div>
          </div>
          <div className="card-footer">
            <a className="btn" href="user.html">
              View
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

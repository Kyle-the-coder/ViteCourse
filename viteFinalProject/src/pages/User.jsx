import { useLoaderData } from "react-router-dom";

export function User() {
  const userInfo = useLoaderData();
  console.log(userInfo);
  return (
    <div className="container">
      <h1 className="page-title">{userInfo.name}</h1>
      <div className="page-subtitle">{userInfo.email}</div>
      <div>
        <b>Company:</b> {userInfo.company.name}
      </div>
      <div>
        <b>Website:</b> {userInfo.email}
      </div>
      <div>
        <b>Address:</b> {userInfo.address.street}, {userInfo.address.suite},{" "}
        {userInfo.address.city}, {userInfo.address.zipcode}
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
        <li>quis ut nam facilis et officia qui</li>
        <li>fugiat veniam minus</li>
        <li className="strike-through">et porro tempora</li>
        <li>laboriosam mollitia et enim quasi adipisci quia provident illum</li>
        <li>qui ullam ratione quibusdam voluptatem quia omnis</li>
        <li>illo expedita consequatur quia in</li>
        <li className="strike-through">quo adipisci enim quam ut ab</li>
      </ul>
    </div>
  );
}

import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

export function User() {
  const userInfo = useLoaderData();
  const [userPostsData, setUserPostsData] = useState("");
  useEffect(() => {
    fetch(`http://127.0.0.1:3000/posts?userId=${userInfo.id}`)
      .then((res) => res.json())
      .then((data) => setUserPostsData(data));
  }, [userInfo.id]);
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
        {userPostsData !== "" &&
          userPostsData.map((post) => {
            return (
              <div className="card" key={post.id}>
                <div className="card-header">{post.title}</div>
                <div className="card-body">
                  <div className="card-preview-text">{post.body}</div>
                </div>
                <div className="card-footer">
                  <Link className="btn" to={`/post/${post.id}`}>
                    View
                  </Link>
                </div>
              </div>
            );
          })}
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

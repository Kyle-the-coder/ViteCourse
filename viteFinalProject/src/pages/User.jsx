import { useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

export function User() {
  const userInfo = useLoaderData();
  const [userPostsData, setUserPostsData] = useState([]);
  const [userTodosData, setUserTodosData] = useState([]);
  useEffect(() => {
    fetch(`http://127.0.0.1:3000/posts?userId=${userInfo.id}`)
      .then((res) => res.json())
      .then((data) => setUserPostsData(data));
    fetch(`http://127.0.0.1:3000/todos?userId=${userInfo.id}`)
      .then((res) => res.json())
      .then((data) => setUserTodosData(data));
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
        {userPostsData.map((post) => {
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
        {userTodosData.map((todo) => {
          return (
            <li
              className={`${todo.completed && "strike-through"}`}
              key={todo.id}
            >
              {todo.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

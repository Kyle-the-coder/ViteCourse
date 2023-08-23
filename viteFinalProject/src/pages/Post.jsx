import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";

export function Post() {
  const postInfo = useLoaderData();
  const [userInfo, setUserInfo] = useState("");
  console.log(postInfo.userId);
  useEffect(() => {
    const getUserInfo = fetch(
      `http://127.0.0.1:3000/users/${postInfo.userId}`
    ).then((res) => res.json());
  }, []);
  return (
    <div className="container">
      <h1 className="page-title">{}</h1>
      <span className="page-subtitle">
        By: <a href="user.html">{}</a>
      </span>
      <div>{}</div>
      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        <div className="card">
          <div className="card-body">
            <div className="text-sm mb-1">Eliseo@gardner.biz</div>
            laudantium enim quasi est quidem magnam voluptate ipsam eos tempora
            quo necessitatibus dolor quam autem quasi reiciendis et nam sapiente
            accusantium
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="text-sm mb-1">Jayne_Kuhic@sydney.com</div>
            est natus enim nihil est dolore omnis voluptatem numquam et omnis
            occaecati quod ullam at voluptatem error expedita pariatur nihil
            sint nostrum voluptatem reiciendis et
          </div>
        </div>
      </div>
    </div>
  );
}

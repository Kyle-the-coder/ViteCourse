import { useLoaderData, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export function Post() {
  const postInfo = useLoaderData();
  const [userInfo, setUserInfo] = useState("");
  const [commentData, setCommentData] = useState([]);
  useEffect(() => {
    fetch(`http://127.0.0.1:3000/users/${postInfo.userId}`)
      .then((res) => res.json())
      .then((data) => setUserInfo(data));

    fetch(`http://127.0.0.1:3000/posts/${postInfo.id}/comments`)
      .then((res) => res.json())
      .then((data) => {
        setCommentData(data);
      });
  }, [postInfo.userId, postInfo.id]);
  console.log(commentData);

  return (
    <div className="container">
      <h1 className="page-title">{postInfo.title}</h1>
      <span className="page-subtitle">
        By: <Link to={`/users/${userInfo.id}`}>{userInfo.name}</Link>
      </span>
      <div>{postInfo.body}</div>
      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        {commentData.map((comment) => {
          return (
            <div className="card" key={comment.id}>
              <div className="card-body">
                <Link to={`users/${comment.userId}`}>{comment.name}</Link>
                <div className="text-sm mb-1">{comment.email}</div>
                {comment.body}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
const FetchList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const controller = new AbortController();
    fetch("https://jsonplaceholder.typicode.com/users", {
      signal: controller.signal,
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          setIsError(true);
          setError("Error in the void");
        }
      })
      .then((data) => {
        setUsers(data);
      })
      .finally(() => setLoading(false));
    return () => {
      controller.abort();
    };
  }, []);
  console.log(users);
  return (
    <>
      <h1>Users:</h1>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <ul>
          {users.map((user) => {
            return <li key={user.id}>{user.name}</li>;
          })}
        </ul>
      )}
    </>
  );
};

export default FetchList;

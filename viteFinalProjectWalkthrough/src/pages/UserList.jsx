import axios from "axios";
import { useLoaderData } from "react-router-dom";
function UserList() {
  const users = useLoaderData();
  return <>users {users.length}</>;
}

function loader({ request: { signal } }) {
  return axios
    .get("http://localhost:3000/users", { signal })
    .then((res) => res.data);
}

export const userListRoute = {
  loader,
  element: <UserList />,
};

import React from "react";
import { useContext } from "react";
import { Context, useUsers } from "./App";

export function Child() {
  const { users } = useUsers();

  return (
    <ul>
      {users.map((user) => {
        return <li>{user.name}</li>;
      })}
    </ul>
  );
}

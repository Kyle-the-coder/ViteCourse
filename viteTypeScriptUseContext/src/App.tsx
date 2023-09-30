import React, { createContext, useContext, useEffect, useState } from "react";
import { Child } from "./Child";

type User = {
  id: string;
  name: string;
  age: number;
};
type ContextType = {
  users: User[];
  addUser: ({ name, age }: { name: string; age: number }) => void;
};

export const Context = createContext<ContextType | null>(null);

export function useUsers() {
  const usersContext = useContext(Context);
  if (usersContext === null) {
    throw new Error("Must Use within provider");
  }

  return usersContext;
}

export default function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  function addUser({ name, age }: { name: string; age: number }) {
    setUsers((prev) => {
      return [...prev, { id: crypto.randomUUID(), name, age }];
    });
  }

  return (
    <Context.Provider value={{ users, addUser }}>
      <Child />
    </Context.Provider>
  );
}

function getUsers() {
  return Promise.resolve([
    { id: crypto.randomUUID(), name: "kyle", age: 32 },
    { id: crypto.randomUUID(), name: "sally", age: 32 },
  ]);
}

import React from "react";
import { List } from "./List";
export default function App() {
  return (
    <List<{ id: number; name: string; age?: number }>
      items={[
        { id: 1, name: "Kyle" },
        { id: 2, name: "Sally" },
      ]}
      getKey={(item) => item.id}
      renderItem={(item) => <div>{item.name}</div>}
    />
  );
}

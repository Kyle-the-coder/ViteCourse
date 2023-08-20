import { useEffect, useRef, useState } from "react";
import { TodoList } from "./components/TodoList";

const STORAGE_KEY = "TODOS";

const ACTIONS = {
  TOGGLE: "TOGGLE",
  ADD: "ADD",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
};

function reducer(todos, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD:
      return [
        ...todos,
        { name: payload.name, completed, id: crypto.randomUUID() },
      ];
    case ACTIONS.TOGGLE:
      return todos.map((todo) => {
        if (todo.id === payload.id) {
          return { ...todo, completed: payload.completed };
        }
      });
    case ACTIONS.UPDATE:
      return todos.map((todo) => {
        if (todo.id === payload.id) {
          return { ...todo, name: payload.name };
        }
      });
    case ACTIONS.DELETE:
      return todos.filter((todo) => todo.id !== payload.id);
  }
}

function App() {
  const [todos, dispatch] = useRef((reducer, [], { initialValue }) => {
    const getStorage = localStorage.getItem(STORAGE_KEY);
    if (getStorage === null) return [];
    return JSON.parse(getStorage);
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, { ...todos });
  }, [todos]);
  return (
    <>
      <TodoList />
    </>
  );
}

export default App;

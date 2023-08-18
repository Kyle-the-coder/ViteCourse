import { useEffect, useState, useReducer, createContext } from "react";
import { NewTodoForm } from "./components/NewTodoForm";
import { TodoItem } from "./components/TodoItem";
import { TodoList } from "./components/TodoList";
import "./styles/styles.css";

const STORAGE_KEY = "TODOS";

export const TodoContext = createContext();

const ACTIONS = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
  TOGGLE: "TOGGLE",
};

function reducer(todos, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD:
      return [
        ...todos,
        { name: payload.name, completed: false, id: crypto.randomUUID() },
      ];
    case ACTIONS.DELETE:
      return todos.filter((todo) => todo.id !== payload.id);
    case ACTIONS.TOGGLE:
      return todos.map((todo) => {
        if (todo.id === payload.id)
          return { ...todo, completed: payload.completed };
        return todo;
      });
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, [], (initialValue) => {
    const getStorage = localStorage.getItem(STORAGE_KEY);
    if (getStorage === null) return initialValue;
    return JSON.parse(getStorage);
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addNewTodo(name) {
    console.log(name);
    dispatch({ type: ACTIONS.ADD, payload: { name } });
  }

  function toggleTodo(todoId, completed) {
    console.log(completed);
    dispatch({ type: ACTIONS.TOGGLE, payload: { id: todoId, completed } });
  }

  function deleteTodo(todoId) {
    dispatch({ type: ACTIONS.DELETE, payload: { id: todoId } });
  }

  return (
    <TodoContext.Provider value={{ todos, addNewTodo, deleteTodo, toggleTodo }}>
      <TodoList />

      <NewTodoForm addNewTodo={addNewTodo} />
    </TodoContext.Provider>
  );
}

export default App;

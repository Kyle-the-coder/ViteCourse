import { useEffect, useState, useReducer } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import "./styles/styles.css";
import { TodoItem } from "./components/TodoItem";
import NewTodoForm from "./components/NewTodoForm";

const ACTIONS = {
  ADD: "ADD",
  UPDATE: "UPDATE",
  TOGGLE: "TOGGLE",
  DELETE: "DELETE",
};
const LOCAL_STORAGE_KEY = "TODOS";

function reducer(todos, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD:
      return [
        ...todos,
        { name: payload.name, completed: false, id: crypto.randomUUID() },
      ];
    case ACTIONS.TOGGLE:
      return todos.map((todo) => {
        if (todo.id === payload.id)
          return { ...todo, completed: payload.completed };
        return todo;
      });
    case ACTIONS.DELETE:
      return todos.filter((todo) => todo.id !== payload.id);
    default:
      throw new Error(`No action found for ${type}`);
  }
  return state;
}

function App() {
  const [todos, dispatch] = useReducer(reducer, [], (intialValue) => {
    const value = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (value == null) return intialValue;
    return JSON.parse(value);
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addNewTodo(name) {
    dispatch({ type: ACTIONS.ADD, payload: { name } });
  }

  function toggleTodo(todoId, completed) {
    dispatch({
      type: ACTIONS.TOGGLE,
      payload: { id: todoId, completed },
    });
  }

  function deleteTodo(todoId) {
    dispatch({ type: ACTIONS.DELETE, payload: { id: todoId } });
  }

  return (
    <>
      <ul id="list">
        {todos.length > 0 ? (
          todos.map((todo) => {
            return (
              <TodoItem
                key={todo.id}
                {...todo}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
              />
            );
          })
        ) : (
          <div>Add a new todo</div>
        )}
      </ul>
      <NewTodoForm addNewTodo={addNewTodo} />
    </>
  );
}

export default App;

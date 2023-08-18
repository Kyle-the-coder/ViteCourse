import { useEffect, useState, useReducer } from "react";
import { NewTodoForm } from "./components/NewTodoForm";
import { TodoItem } from "./components/TodoItem";
import "./styles/styles.css";

const STORAGE_KEY = "TODOS";

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
  }
}

function App() {
  const [newTodoName, setNewTodoName] = useState("");
  const [todos, dispatch] = useReducer(reducer, [], (initialValue) => {
    const getStorage = localStorage.getItem(STORAGE_KEY);
    if (getStorage === null) return initialValue;
    return JSON.parse(getStorage);
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addNewTodo(name) {
    if (name === "") return;
    dispatch({ type: ACTIONS.ADD, payload: name });
    setNewTodoName("");
  }

  function toggleTodo(todoId, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === todoId) return { ...todo, completed };

        return todo;
      });
    });
  }

  function deleteTodo(todoId) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== todoId);
    });
  }

  return (
    <>
      <ul id="list">
        {todos.map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              {...todo}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
            />
          );
        })}
      </ul>

      <NewTodoForm newTodoName={newTodoName} setNewTodoName={setNewTodoName} />
    </>
  );
}

export default App;

import { createContext, useContext, useEffect, useReducer } from "react";
import { NewTodoForm } from "./components/NewTodoForm";
import { TodoList } from "./components/TodoList";
import "./styles/styles.css";

const STORAGE_KEY = "TODOS";

const ACTIONS = {
  TOGGLE: "TOGGLE",
  ADD: "ADD",
  UPDATE: "UPDATE",
  DELETE: "DELETE",
};

const TodoContext = createContext();

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
  const [todos, dispatch] = useReducer(reducer, [], (initialValue) => {
    const getStorage = localStorage.getItem(STORAGE_KEY);

    if (getStorage === null) return initialValue;
    return JSON.parse(getStorage);
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);
  console.log(todos);

  function addNewTodo(name) {
    dispatch({ type: ACTIONS.ADD, payload: name });
  }

  function toggleTodo(todoId, completed) {
    dispatch({ type: ACTIONS.TOGGLE, payload: { id: todoId, completed } });
  }

  function updateTodo(todoId, name) {
    dispatch({ type: ACTIONS.UPDATE, payload: { id: todoId }, name });
  }

  return (
    <TodoContext.Provider value={{ todos, addNewTodo, toggleTodo }}>
      <NewTodoForm />
      <TodoList />
    </TodoContext.Provider>
  );
}

export default App;

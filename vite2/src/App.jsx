import { useState } from "react";
import TodoFunction from "./ToDo";
import TodoList from "./ToDoList";

function App() {
  const [todoList, setTodoList] = useState([]);
  return (
    <>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
      <TodoFunction setTodoList={setTodoList} />
    </>
  );
}

export default App;

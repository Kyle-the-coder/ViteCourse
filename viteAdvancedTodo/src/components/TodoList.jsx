import { useContext } from "react";
import { TodoContext } from "../App";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const { todos } = useContext(TodoContext);
  return (
    <ul id="list">
      {todos.length > 0 ? (
        todos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} />;
        })
      ) : (
        <div>Add a new todo</div>
      )}
    </ul>
  );
}

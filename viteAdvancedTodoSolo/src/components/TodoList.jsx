import { useContext } from "react";
import { TodoContext } from "../App";
import { TodoItem } from "./TodoItem";

export function TodoList() {
  const { todos } = useContext(TodoContext);
  return (
    <ul>
      {todos.length > 0 ? (
        todos.map((todo) => {
          return <TodoItem key={todo.id} {...todo} />;
        })
      ) : (
        <div>add new todo</div>
      )}
    </ul>
  );
}

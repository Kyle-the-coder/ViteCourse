import { useContext } from "react";
import { TodoContext } from "../App";

export function TodoItem({ id, name, completed }) {
  const { toggleTodo, deleteTodo } = useContext(TodoContext);
  console.log(id);
  return (
    <li>
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        <span className={`${completed && "line"}`}>{name}</span>
      </label>
      <button>Delete</button>
    </li>
  );
}

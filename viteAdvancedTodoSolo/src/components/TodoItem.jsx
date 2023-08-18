import { useContext } from "react";
import { TodoContext } from "../App";

export function TodoItem() {
  const { todos, toggleTodo, deleteTodo } = useContext(TodoContext);
  return (
    <li className="list-item">
      <label className="list-item-label">
        <input
          checked={todos.completed}
          type="checkbox"
          data-list-item-checkbox
          onChange={(e) => toggleTodo(todos.id, e.target.checked)}
        />
        <span data-list-item-text>{todos.name}</span>
      </label>
      <button onClick={() => deleteTodo(todos.id)} data-button-delete>
        Delete
      </button>
    </li>
  );
}

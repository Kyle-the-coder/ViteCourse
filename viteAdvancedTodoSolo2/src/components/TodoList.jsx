import { useContext } from "react";
import { TodoContext } from "../App";

export function TodoList() {
  const { todos } = useContext(TodoContext);
  return (
    <div>
      <ul>
        {todos.map((todo) => {
          <li>
            <input type="checkbox" checked={todo.completed} />
            <label>{todo.name}</label>
            <button>delete</button>
          </li>;
        })}
      </ul>
    </div>
  );
}

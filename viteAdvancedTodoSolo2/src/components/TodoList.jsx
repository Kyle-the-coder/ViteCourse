import { useContext } from "react";
import { TodoContext } from "../App";

export function TodoList() {
  const { todos } = useContext(TodoContext);
  console.log(todos);
  return (
    <div className="todoListContainer">
      <h2>List:</h2>
      <ul className="listItemContainer">
        {todos.map((todo) => {
          return (
            <li>
              <div>
                <input type="checkbox" checked={todo.compeleted} />
                <label>{todo.name}</label>
                <button>Delete</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

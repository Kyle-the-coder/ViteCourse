import { useLoaderData } from "react-router-dom";

export function Todos() {
  const todosData = useLoaderData();
  return (
    <div className="container">
      <h1 className="page-title">Todos</h1>
      <ul>
        {todosData.map((todo) => {
          return (
            <li
              className={`${todo.completed && "strike-through"} `}
              key={todo.id}
            >
              {todo.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

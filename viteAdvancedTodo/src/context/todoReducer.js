import { useReducer } from "react";

const ACTIONS = {
  COMPLETED: "COMPLETED",
  DELETE: "DELETE",
};

export function todoReducer({ todos, setTodos, todoId, completed }, action) {
  switch (action.type) {
    case ACTIONS.COMPLETED:
      return setTodos((currentTodos) => {
        return currentTodos.map((todo) => {
          if (todo.id === todoId) return { ...todo, completed };
          return todo;
        });
      });
    case ACTIONS.DELETE:
      return setTodos((currentTodos) => {
        return currentTodos.filter((todo) => todo.id !== todoId);
      });
    default:
      return todos;
  }
}

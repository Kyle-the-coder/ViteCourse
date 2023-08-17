import { useContext, useRef } from "react";
import { TodoContext } from "../App";

const NewTodoForm = () => {
  const nameRef = useRef();
  const { addNewTodo } = useContext(TodoContext);
  function handleSubmit(e) {
    if (nameRef.current.value === "") return;
    e.preventDefault();
    addNewTodo(nameRef.current.value);
    nameRef.current.value === "";
  }
  return (
    <form onSubmit={handleSubmit} id="new-todo-form">
      <label htmlFor="todo-input">New Todo</label>
      <input type="text" id="todo-input" ref={nameRef} />
      <button>Add Todo</button>
    </form>
  );
};

export default NewTodoForm;

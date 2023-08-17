import { useRef } from "react";
const NewTodoForm = ({ addNewTodo }) => {
  const nameRef = useRef();
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

import { useRef } from "react";
import "../styles/styles.css";

export function NewTodoForm() {
  const nameRef = useRef();
  function handleSubmit(e) {
    e.preventDefault();
    console.log(nameRef.current.value);
    nameRef.current.value === "";
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="newFormContainer">
        <label data-label className="newFormLabel">
          New Todo:
        </label>
        <input type="text" ref={nameRef} className="newFormInput" />
        <button className="newFormButton">Submit</button>
      </div>
    </form>
  );
}

import { useRef } from "react";
import "../styles/styles.css";

export function NewTodoForm() {
  const nameRef = useRef();
  return (
    <form>
      <label data-label className="newFormLabel">
        New Todo:
      </label>
      <input type="text" ref={nameRef} className="newFormInput" />
      <button>Submit</button>
    </form>
  );
}

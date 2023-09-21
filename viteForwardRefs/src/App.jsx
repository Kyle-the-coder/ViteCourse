import { useState, useRef } from "react";

function App() {
  const inputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(inputRef.current.value);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} style={{ border: "2px solid green" }} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;

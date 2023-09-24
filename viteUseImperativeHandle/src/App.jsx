import { useRef, useState } from "react";

function App() {
  const inputRef = useRef();
  return (
    <>
      <button onClick={() => inputRef.current.focus()}>Focus</button>
      <Input type="text" ref={inputRef} />
    </>
  );
}

export default App;

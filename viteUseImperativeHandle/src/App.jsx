import { useRef } from "react";
import { Input } from "./Input";

function App() {
  const inputRef = useRef();

  return (
    <>
      <button onClick={() => inputRef.current.input2.focus()}>Focus</button>
      <Input type="text" ref={inputRef} />
    </>
  );
}

export default App;

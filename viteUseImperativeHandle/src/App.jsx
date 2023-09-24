import { useRef } from "react";
import { Input } from "./Input";

function App() {
  const inputRef = useRef();

  return (
    <>
      <button onClick={() => console.log(inputRef.current.value)}>Focus</button>
      <Input type="text" ref={inputRef} />
    </>
  );
}

export default App;

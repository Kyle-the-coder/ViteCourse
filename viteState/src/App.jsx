import { useState } from "react";
import ArrayChallenge from "./Array";
import Counter from "./Counter";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ArrayChallenge />
    </>
  );
}

export default App;

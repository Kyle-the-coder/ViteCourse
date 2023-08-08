import { useState } from "react";
import ArrayChallenge from "./Array";
import Counter from "./Counter";
import NameAge from "./NameAge";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <NameAge />
    </>
  );
}

export default App;

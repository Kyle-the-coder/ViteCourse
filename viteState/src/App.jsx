import { useState, useEffect } from "react";
import ArrayChallenge from "./Array";
import Counter from "./Counter";
import NameAge from "./NameAge";

function App() {
  const [count, setCount] = useState(0);
  const [isShown, setIsShown] = useState(true);
  const childShown = isShown ? <NameAge /> : null;

  return (
    <>
      <button onClick={() => setIsShown((s) => !s)}>Show/Hide</button>
      {childShown}
    </>
  );
}

export default App;

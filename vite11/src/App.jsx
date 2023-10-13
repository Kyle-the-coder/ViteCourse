import { useState } from "react";
import { Counter } from "./Counter";

export default function App() {
  const [name, setName] = useState("");
  const [intialCount, setInitialCount] = useState(0);

  return (
    <>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => setInitialCount((c) => c + 1)}>+</button>
      <br />
      <Counter intialCount={intialCount} otherProp="hi" />
    </>
  );
}

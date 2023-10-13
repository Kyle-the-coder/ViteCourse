import { useState } from "react";

export default function Counter({ intialCount }) {
  const [count, setCount] = useState(intialCount);
  function handleAdd() {
    return setCount(count + 1);
  }
  function handleMinus() {
    return setCount(count - 1);
  }
  return (
    <>
      <button onClick={() => handleMinus()}>-</button>
      {count}
      <button onClick={() => handleAdd()}>+</button>
    </>
  );
}

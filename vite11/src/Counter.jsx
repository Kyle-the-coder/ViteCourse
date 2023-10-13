import { memo, useState } from "react";

function Component({ intialCount, otherProp }) {
  const [count, setCount] = useState(intialCount);
  function handleAdd() {
    return setCount(count + 1);
  }
  function handleMinus() {
    return setCount(count - 1);
  }
  return (
    <>
      <div>{otherProp}</div>
      <button onClick={() => handleMinus()}>-</button>
      {count}
      <button onClick={() => handleAdd()}>+</button>
    </>
  );
}

export const Counter = memo(Component, (prevProps, newPorps) => {
  return prevProps.otherProp === newPorps.otherProp;
});

import { useState, useEffect } from "react";

export function useArray(INITIAL_ARRAY) {
  const [array, setArray] = useState(INITIAL_ARRAY);

  const push = (item) => {
    setArray((prevArr) => [...prevArr, item]);
  };

  const replace = (index, newItem) => {
    setArray((prevArr) => {
      return [...prevArr.slice(0, index), newItem, ...prevArr.slice(index + 1)];
    });
  };

  const filter = (item) => {
    setArray((prevArr) => {
      return prevArr.filter(item);
    });
  };

  const remove = (index) => {
    setArray((prevArr) => {
      return [...prevArr.slice(0, index), ...prevArr.slice(index + 1)];
    });
  };

  const clear = () => setArray([]);

  const reset = () => setArray(INITIAL_ARRAY);

  return {
    array,
    set: setArray,
    push,
    replace,
    filter,
    remove,
    reset,
    clear,
  };
}

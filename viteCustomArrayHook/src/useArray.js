import { useState, useCallback } from "react";

export function useArray(INITIAL_ARRAY) {
  const [array, setArray] = useState(INITIAL_ARRAY);

  const push = useCallback((item) => {
    setArray((prevArr) => [...prevArr, item]);
  }, []);

  const replace = useCallback((index, newItem) => {
    setArray((prevArr) => {
      return [...prevArr.slice(0, index), newItem, ...prevArr.slice(index + 1)];
    });
  }, []);

  const filter = useCallback((item) => {
    setArray((prevArr) => {
      return prevArr.filter(item);
    });
  }, []);

  const remove = useCallback((index) => {
    setArray((prevArr) => {
      return [...prevArr.slice(0, index), ...prevArr.slice(index + 1)];
    });
  }, []);

  const clear = useCallback(() => setArray([]), []);

  const reset = useCallback(() => setArray(INITIAL_ARRAY), [INITIAL_ARRAY]);

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

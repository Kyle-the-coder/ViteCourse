import { useEffect, useState } from "react";
export function useLocalStorage(key, intialValue) {
  const [value, setValue] = useState(() => {
    const localValue = localStorage.getItem(key);
    if (localValue === null) {
      console.log("key is null");
      if (typeof intialValue === "function") {
        console.log("its a function");
        return intialValue();
      } else {
        console.log("its initial value");
        return intialValue;
      }
    } else {
      console.log(localValue);
      return JSON.parse(localValue);
    }
  });
  useEffect(() => {
    if (value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value]);

  return [value, setValue];
}

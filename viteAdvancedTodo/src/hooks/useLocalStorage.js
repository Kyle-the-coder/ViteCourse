import { useEffect, useState } from "react";
export function useLocalStorage(key, intialValue) {
  const [value, setValue] = useState(() => {
    const localValue = localStorage.getItem(key);
    if (localValue === null) {
      if (typeof intialValue === "function") {
        return intialValue();
      } else {
        return intialValue;
      }
    } else {
      return localValue;
    }
  });
  useEffect(() => {
    if (value === undefined) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, value);
    }
  });
}

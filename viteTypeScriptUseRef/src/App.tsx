import React from "react";
import { useRef } from "react";

export default function App() {
  //Pass null and the Html element that is being used in this case its an input
  const inputRef = useRef<HTMLInputElement>(null);
  const value = useRef(0);

  inputRef.current?.focus();

  value.current = 10;

  return <input ref={inputRef} />;
}

import React from "react";
import { useState } from "react";

export default function App() {
  const [value, setValue] = useState<string>();
  // const [value, setValue] = useState<string[]>([])
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}

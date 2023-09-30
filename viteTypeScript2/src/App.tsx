import React from "react";
import { Button } from "./Button";
import { Child } from "./Child";
export default function App() {
  return (
    <div>
      <Child>
        <h1>Hello</h1>
      </Child>
      <Button outline={true} disabled>
        Hi I am a button
      </Button>
    </div>
  );
}

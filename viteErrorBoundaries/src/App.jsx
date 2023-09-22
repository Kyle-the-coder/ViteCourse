import { useState } from "react";
import { Child } from "./Child";
import { ErrorBoundary } from "./ErrorBoundary";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Parent</h1>
      <ErrorBoundary fallback={<h1>error in child</h1>}>
        <Child />
      </ErrorBoundary>
    </>
  );
}

export default App;

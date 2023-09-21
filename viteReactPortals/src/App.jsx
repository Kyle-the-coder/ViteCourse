import { useState } from "react";
import { createPortal } from "react-dom";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <h1>app content</h1>
      <button onClick={() => setIsOpen(true)}>Show Message</button>
      <AlertMessage isOpen={isOpen} onClose={() => setIsOpen(false)}>
        Secret Message
        <br />
        Click to close
      </AlertMessage>
    </div>
  );
}

function AlertMessage({ children, onClose, isOpen }) {
  if (!isOpen) return null;
  return createPortal(
    <div onClick={onClose} style={{ backgroundColor: "blue" }}>
      {children}
    </div>,
    document.querySelector("#alertMessages")
  );
}

export default App;

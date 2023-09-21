import { useState } from "react";
import { createPortal } from "react-dom";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div style={{ position: "relative", marginTop: "100px" }}>
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
    <div
      onClick={onClose}
      style={{
        backgroundColor: "blue",
        cursor: "pointer",
        position: "absolute",
        top: ".5rem",
        left: "50%",
        translate: "-50%",
      }}
    >
      {children}
    </div>,
    document.querySelector("#alertMessages")
  );
}

export default App;

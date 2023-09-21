import { createPortal } from "react-dom";

export function CustomModal({ isCustomShown, setIsCustomShown }) {
  return createPortal(
    <div className={`modal-overlay ${isCustomShown && "show"}`}>
      <div className="modal">
        <p>
          This is a <strong>CUSTOM</strong> modal
        </p>
        <button onClick={() => setIsCustomShown(false)}>Close</button>
      </div>
    </div>,
    document.querySelector("#modalSection")
  );
}

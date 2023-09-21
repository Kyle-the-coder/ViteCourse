import { createPortal } from "react-dom";

export function CustomModal() {
  return createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <p>
          This is a <strong>CUSTOM</strong> modal
        </p>
        <button>Close</button>
      </div>
    </div>,
    document.querySelector("#modalSection")
  );
}

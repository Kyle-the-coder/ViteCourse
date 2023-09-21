import { createPortal } from "react-dom";

function CustomModal() {
  return createPortal(
    <div class="modal-overlay">
      <div class="modal">
        <p>
          This is a <strong>CUSTOM</strong> modal
        </p>
        <button>Close</button>
      </div>
    </div>,
    document.querySelector("#modalSection")
  );
}

import { Children, useEffect } from "react";
import { createPortal } from "react-dom";

export function CustomModal({ isCustomShown, setIsCustomShown, children }) {
  useEffect(() => {
    function handler(e) {
      if (e.key === "Escape") {
        setIsCustomShown(false);
      }
    }

    document.addEventListener("keydown", handler);

    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [isCustomShown]);
  return createPortal(
    <div className={`modal-overlay ${isCustomShown && "show"}`}>
      <div className="modal">{children}</div>
    </div>,
    document.querySelector("#modalSection")
  );
}

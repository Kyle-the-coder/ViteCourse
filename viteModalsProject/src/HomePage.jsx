import { useState } from "react";
import { CustomModal } from "./CustomModal";
import { DialogueModal } from "./DialogueModal";

function HomePage() {
  const [isCustomShown, setIsCustomShown] = useState(false);
  const [isDialogueShown, setIsDialogueShown] = useState(false);
  return (
    <div style={{ position: "relative", marginTop: "100px" }}>
      <button onClick={() => setIsCustomShown(!isCustomShown)}>
        Show Custom Modal
      </button>
      <br />
      <button onClick={() => setIsDialogueShown(!isDialogueShown)}>
        Show Dialog Modal
      </button>
      <CustomModal
        isCustomShown={isCustomShown}
        setIsCustomShown={setIsCustomShown}
      >
        {" "}
        <p>
          This is a <strong>cUSTOM</strong> modal
        </p>
        <button onClick={() => setIsCustomShown(false)}>Close</button>
      </CustomModal>
      {isDialogueShown ? (
        <DialogueModal
          setIsDialogueShown={setIsDialogueShown}
          isDialogueShown={isDialogueShown}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export const homePage = {
  element: <HomePage />,
};

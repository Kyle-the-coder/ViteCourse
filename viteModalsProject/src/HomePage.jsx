import { useState } from "react";
import { CustomModal } from "./CustomModal";

function HomePage() {
  const [isCustomShown, setIsCutomShown] = useState(false);
  console.log(isCustomShown);
  return (
    <div>
      <button onClick={() => setIsCutomShown(!isCustomShown)}>
        Show Custom Modal
      </button>
      <br />
      <button data-dialog-open>Show Dialog Modal</button>
      <CustomModal />
    </div>
  );
}

export const homePage = {
  element: <HomePage />,
};

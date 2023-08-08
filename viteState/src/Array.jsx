import { useState } from "react";
const ArrayChallenge = () => {
  const [letterArr, setLetterArr] = useState(["A", "B", "C"]);

  const handleRemoveFirstItem = () => {
    setLetterArr((currentArray) => currentArray.slice(1));
  };

  return (
    <div>
      <div>
        <button onClick={handleRemoveFirstItem}>Remove First Item</button>
      </div>
      {letterArr.join(", ")}
    </div>
  );
};

export default ArrayChallenge;

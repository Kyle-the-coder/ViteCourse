import { useState } from "react";
const ArrayChallenge = () => {
  const [letterArr, setLetterArr] = useState(["A", "B", "C"]);
  const [specificLetter, setSpecificLetter] = useState("");
  const [newLetter, setNewLetter] = useState("");

  const handleRemoveFirstItem = () => {
    setLetterArr((currentArray) => currentArray.slice(1));
  };

  const handleRemoveSpecificLetter = (letter) => {
    setLetterArr((currentArray) =>
      currentArray.filter((item) => item !== letter)
    );
  };

  const handleAddNewLetterBeg = (letter) => {
    setLetterArr([letter, ...letterArr]);
  };
  const handleAddNewLetterEnd = (letter) => {
    setLetterArr([...letterArr, letter]);
  };

  return (
    <div>
      <div>
        <button onClick={handleRemoveFirstItem}>Remove First Item</button>
        <input
          type="text"
          onChange={(e) => setSpecificLetter(e.target.value)}
        />
        <button onClick={() => handleRemoveSpecificLetter(specificLetter)}>
          Click to remove your letter
        </button>
        <input type="text" onChange={(e) => setNewLetter(e.target.value)} />
        <button onClick={() => handleAddNewLetterBeg(newLetter)}>
          Click to add your letter to the beginning
        </button>
        <input type="text" onChange={(e) => setNewLetter(e.target.value)} />
        <button onClick={() => handleAddNewLetterEnd(newLetter)}>
          Click to add your letter to the End
        </button>
      </div>
      {letterArr.join(", ")}
    </div>
  );
};

export default ArrayChallenge;

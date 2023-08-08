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

  const handleClearLetterArr = () => {
    setLetterArr([]);
  };

  const handleResetLetterArr = () => {
    setLetterArr(["A", "B", "C"]);
  };

  const handleAToH = (letter) => {
    setLetterArr((currentArray) => {
      return currentArray.map((element) => {
        if (element === letter) return "H";
        return element;
      });
    });
  };

  return (
    <div>
      <div>
        <div>
          <button onClick={handleRemoveFirstItem}>Remove First Item</button>
        </div>
        <div>
          <input
            type="text"
            onChange={(e) => setSpecificLetter(e.target.value)}
          />
          <button onClick={() => handleRemoveSpecificLetter(specificLetter)}>
            Click to remove your letter
          </button>
        </div>
        <div>
          <input type="text" onChange={(e) => setNewLetter(e.target.value)} />
          <button onClick={() => handleAddNewLetterBeg(newLetter)}>
            Click to add your letter to the beginning
          </button>
        </div>
        <div>
          <input type="text" onChange={(e) => setNewLetter(e.target.value)} />
          <button onClick={() => handleAddNewLetterEnd(newLetter)}>
            Click to add your letter to the End
          </button>
        </div>
        <div>
          <button onClick={handleClearLetterArr}>Click to clear</button>
        </div>
        <div>
          <button onClick={handleResetLetterArr}>Click to reset</button>
        </div>
        <div>
          <button onClick={() => handleAToH("A")}>
            Click to change A to H
          </button>
        </div>
      </div>
      {letterArr.join(", ")}
    </div>
  );
};

export default ArrayChallenge;

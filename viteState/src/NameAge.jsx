import { useState } from "react";
import "./buttons.css";

const NameAge = () => {
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState(0);
  const handleIncreaseAge = () => {
    setUserAge(userAge + 1);
  };
  const handleDecreaseAge = () => {
    setUserAge(userAge - 1);
  };
  return (
    <div>
      <div>
        <label>Add your name:</label>
        <input type="text" onChange={(e) => setUserName(e.target.value)} />
      </div>
      <label>Age:</label>
      <div className="ageButtons">
        <button className="buttons" onClick={handleDecreaseAge}>
          -
        </button>
        <p>{userAge}</p>
        <button className="buttons" onClick={handleIncreaseAge}>
          +
        </button>
      </div>
      <div>
        <h1>
          Hello my name is {userName} and I am {userAge} years old
        </h1>
      </div>
    </div>
  );
};

export default NameAge;

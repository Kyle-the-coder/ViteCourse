import e from "cors";
import { useState } from "react";
import "../styles/styles.css";
const StateForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErrors, setEmailErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <form className="form" onSubmit={handleOnSubmit}>
        <div className={`form-group ${emailErrors.length > 0 && "error"}`}>
          <label className="label" htmlFor="email">
            Email
          </label>
          <input
            className="input"
            type="email"
            id="email"
            value="test@test.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailErrors.length > 0 && (
            <div className="msg">Must end in @webdevsimplified.com</div>
          )}
        </div>
        <div className={`form-group ${passwordErrors.length > 0 && "error"}`}>
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="input"
            value="Password123!"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordErrors.length > 0 && (
            <div className="msg">{passwordErrors}</div>
          )}
        </div>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default StateForm;

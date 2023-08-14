import { useState } from "react";
import { checkEmail } from "../validators";
import { checkPassword } from "../validators";
import "../styles/styles.css";

const StateForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [afterFirstSubmit, setAfterFirstSubmit] = useState(false);

  const emailErrors = afterFirstSubmit ? checkEmail(email) : [];
  const passwordErrors = afterFirstSubmit ? checkPassword(password) : [];
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const emailValidation = checkEmail(email);
    const passwordValidation = checkPassword(password);
    setEmailErrors(emailValidation);
    setPasswordErrors(passwordValidation);
    if (emailValidation.length === 0 && passwordValidation.length === 0) {
      alert("success");
    }
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
            placeholder="test@test.com"
            value={email}
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
            placeholder="Password123!"
            value={password}
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordErrors.length > 0 && (
            <div className="msg">{passwordErrors.join(", ")}</div>
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

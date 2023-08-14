import { useState, useRef } from "react";
import { checkEmail } from "../validators";
import { checkPassword } from "../validators";
import "../styles/styles.css";

const RefForm = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [emailErrors, setEmailErrors] = useState([]);
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [afterFirstSubmit, setAfterFirstSubmit] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setAfterFirstSubmit(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
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
            ref={emailRef}
            onChange={
              afterFirstSubmit
                ? (e) => setEmailErrors(checkEmail(e.target.value))
                : undefined
            }
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
            type="password"
            id="password"
            ref={passwordRef}
            onChange={
              afterFirstSubmit
                ? (e) => setPasswordErrors(checkPassword(e.target.value))
                : undefined
            }
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

export default RefForm;

import { useState, useRef } from "react";
import "./style.css";

function App() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [isEmailErr, setIsEmailErr] = useState(false);
  const [isPasswordErr, setIsPasswordErr] = useState(false);
  const [passwordErrMsg, setPasswordErrMsg] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;
    if (!email.includes("@webdevsimplified.com")) {
      setIsEmailErr(true);
    } else {
      setIsEmailErr(false);
    }
    if (password === "") {
      setIsPasswordErr(true);
      setPasswordErrMsg("not be blank");
    } else if (password.length < 10) {
      setIsPasswordErr(true);
      setPasswordErrMsg("be at least 10 characters");
    } else if (!lowercaseRegex.test(password)) {
      setIsPasswordErr(true);
      setPasswordErrMsg("contain a lowercase letter");
    } else if (!uppercaseRegex.test(password)) {
      setIsPasswordErr(true);
      setPasswordErrMsg("contain an uppercase letter");
    } else if (!numberRegex.test(password)) {
      setIsPasswordErr(true);
      setPasswordErrMsg("contain a number");
    } else {
      setIsPasswordErr(false);
    }
  };
  return (
    <>
      <div>
        <form className="form" onSubmit={handleForm}>
          <div className="form-group error">
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              className="input"
              type="email"
              id="email"
              placeholder="test@testmail.com"
              ref={emailRef}
            />
            {isEmailErr && (
              <div className="msg">Must end in @webdevsimplified.com</div>
            )}
          </div>
          <div className="form-group">
            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              className="input"
              placeholder="password"
              type="password"
              id="password"
              ref={passwordRef}
            />
            {isPasswordErr && (
              <div className="msg">password must {passwordErrMsg} </div>
            )}
          </div>
          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default App;

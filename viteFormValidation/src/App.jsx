import e from "cors";
import { useState } from "react";
import "./style.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(null);
  const [isEmailErr, setIsEmailErr] = useState(false);
  const [isPasswordErr, setIsPasswordErr] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;
    if (!email.includes("@webdevsimplified.com")) {
      setIsEmailErr(true);
    } else {
      setIsEmailErr(false);
    }
    if (
      password === "" ||
      password.length < 10 ||
      !lowercaseRegex.test(password) ||
      !uppercaseRegex.test(password) ||
      !numberRegex.test(password)
    ) {
      setIsPasswordErr(true);
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value="Password123!"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {isPasswordErr && <h1 className="msg">Password must be</h1>}
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

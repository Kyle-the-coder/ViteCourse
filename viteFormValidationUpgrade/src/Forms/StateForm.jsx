import { useState } from "react";
import "../styles/styles.css";
const StateForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <form className="form">
        <div className="form-group error">
          <label className="label" for="email">
            Email
          </label>
          <input
            className="input"
            type="email"
            id="email"
            value="test@test.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="msg">Must end in @webdevsimplified.com</div>
        </div>
        <div className="form-group">
          <label className="label" for="password">
            Password
          </label>
          <input
            className="input"
            value="Password123!"
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default StateForm;

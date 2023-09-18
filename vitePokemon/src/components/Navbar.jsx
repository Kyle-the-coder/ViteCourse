import { useState } from "react";
import { Link } from "react-router-dom";
import pokeBall from "../assets/pokeball.png";

export function Navbar() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode", darkMode);
  };
  return (
    <nav className="top-nav">
      <div className="nav-text-large">
        <Link to="/" className="home-button">
          Pokemon Stay Home
          <img src={pokeBall} className="nav-Img" />
        </Link>
      </div>
      <ul className="nav-list">
        <li>
          <Link to="/storage">Your Pokemon</Link>
        </li>
        <li>
          <Link to="/newpokemon">New Pokemon</Link>
        </li>
      </ul>
      <button onClick={toggleDarkMode}>Toggle Dark Mode</button>
    </nav>
  );
}

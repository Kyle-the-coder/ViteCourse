import { useState } from "react";
import { Link } from "react-router-dom";
import pokeBall from "../assets/pokeball.png";
import { useTheme } from "./ThemeContext";

export function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <nav className={darkMode ? "top-nav-dark" : "top-nav-light"}>
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

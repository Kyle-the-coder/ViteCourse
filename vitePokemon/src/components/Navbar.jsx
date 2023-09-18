import { useState } from "react";
import { Link } from "react-router-dom";
import pokeBall from "../assets/pokeball.png";
import { useTheme } from "./ThemeContext";
import "../styles/toggle.css";

export function Navbar() {
  const { darkMode, toggleDarkMode } = useTheme();
  console.log(darkMode);

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
        <li>
          <label className="switch">
            <input type="checkbox" onChange={toggleDarkMode} />
            <span className="slider"></span>
          </label>
        </li>
      </ul>
    </nav>
  );
}

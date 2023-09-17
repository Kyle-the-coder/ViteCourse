import { Link } from "react-router-dom";
import pokeBall from "../assets/pokeball.png";

export function Navbar() {
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
    </nav>
  );
}

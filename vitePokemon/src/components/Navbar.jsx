import { Link } from "react-router-dom";
import pokeBall from "../assets/pokeball.png";

export function Navbar() {
  return (
    <nav className="top-nav">
      <div className="nav-text-large">
        Pokemon Storage
        <img src={pokeBall} width="60" height="60" />
      </div>
      <ul className="nav-list">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/storage">Your Storage</Link>
        </li>
        <li>
          <Link to="/newpokemon">New Pokemon</Link>
        </li>
      </ul>
    </nav>
  );
}

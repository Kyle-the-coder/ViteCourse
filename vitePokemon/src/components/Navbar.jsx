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
          <Link to="/posts">Home</Link>
        </li>
        <li>
          <Link to="/users">Your Storage</Link>
        </li>
        <li>
          <Link to="/todos">New Pokemon</Link>
        </li>
      </ul>
    </nav>
  );
}

import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="top-nav">
      <div className="nav-text-large">Pokemon Storage</div>
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

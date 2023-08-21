import { Link } from "react-router-dom";

export function TeamNav() {
  return (
    <ul>
      <li>
        <Link to="/team/joe">Team Joe</Link>
      </li>
      <li>
        <Link to="/team/sally">Team Sally</Link>
      </li>
    </ul>
  );
}

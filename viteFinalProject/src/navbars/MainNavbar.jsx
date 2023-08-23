import { NavLink } from "react-router-dom";

export function MainNavbar() {
  return (
    <ul>
      <li>
        <NavLink to="/posts">Posts</NavLink>
      </li>
      <li>
        <NavLink to="/users">Users</NavLink>
      </li>
      <li>
        <NavLink to="/todos">Todos</NavLink>
      </li>
    </ul>
  );
}

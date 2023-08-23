import { Link } from "react-router-dom";
import teamMembers from "./teamMembers.json";

export function TeamNav() {
  return (
    <nav>
      <ul>
        {teamMembers.map((member) => (
          <li key={member.id}>
            <Link to={member.id}>Team - {member.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

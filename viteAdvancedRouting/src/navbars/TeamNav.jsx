import { Link, useLoaderData } from "react-router-dom";

export function TeamNav() {
  const teamMembers = useLoaderData();
  return (
    <nav>
      <ul>
        {teamMembers.map((member) => (
          <li key={member.id}>
            <Link to={member.id.toString()}>Team - {member.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

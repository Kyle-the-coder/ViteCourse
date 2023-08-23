import { useLoaderData, useParams } from "react-router-dom";

export function TeamMember({ name }) {
  const member = useLoaderData();

  return <h1>Team Member - {member.name}</h1>;
}

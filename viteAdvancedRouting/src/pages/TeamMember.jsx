import { useParams } from "react-router-dom";
import teamMembers from "../teamMembers.json";

export function TeamMember({ name }) {
  const { memberId } = useParams();
  const member = teamMembers.find((m) => m.id === memberId);
  return <h1>Team Member - {member.name}</h1>;
}

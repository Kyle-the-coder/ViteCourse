import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

export function nav(route) {
  return navigate(route);
}

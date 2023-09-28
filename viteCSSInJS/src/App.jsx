import { Child } from "./Child";
import styled from "styled-components";

const RedHOne = styled.h1`
  color: blue;
`;

export default function App() {
  return (
    <div>
      <RedHOne>App</RedHOne>
      <Child />
    </div>
  );
}

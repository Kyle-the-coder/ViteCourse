import { Child } from "./Child";
import styled from "styled-components";

export default function App() {
  const RedHOne = styled.h1`
    color: blue;
  `;
  return (
    <div>
      <RedHOne>App</RedHOne>
      <Child />
    </div>
  );
}

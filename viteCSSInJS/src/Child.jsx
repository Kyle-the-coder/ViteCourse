import { useEffect, useState } from "react";
import styled from "styled-components";
import { ChangeButton } from "./ChangeButton";

const RedHOne = styled.h1`
  color: ${(props) => props.color};
`;

export function Child() {
  const [color, setColor] = useState("");
  const [isColor, setIsColor] = useState(false);
  useEffect(() => {
    if (color === "red") {
      setColor("pink");
    }
  }, []);

  function noColor() {
    setIsColor(!isColor);
    if (!isColor) {
      setColor("black");
    } else if (isColor) {
      setColor("pink");
    }
  }

  return (
    <>
      <RedHOne color={color}>Child</RedHOne>
      <label>enter a color:</label>
      <input type="text" onChange={(e) => setColor(e.target.value)} />
      <ChangeButton onClick={() => noColor()}>Change Color</ChangeButton>
    </>
  );
}

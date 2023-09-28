import { useEffect, useState } from "react";
import styled from "styled-components";
import { ChangeButton } from "./ChangeButton";

export function Child() {
  const [color, setColor] = useState("red");
  const [isColor, setIsColor] = useState(false);
  useEffect(() => {
    if (color === "red") {
      setColor("pink");
    }
  }, []);
  const RedHOne = styled.h1`
    color: ${(props) => props.color};
  `;

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
      <ChangeButton onClick={() => noColor()}>Change Color</ChangeButton>
    </>
  );
}

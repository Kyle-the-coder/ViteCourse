import { forwardRef, useImperativeHandle, useRef, useState } from "react";

function Inner(props, ref) {
  const [value, setValue] = useState("");
  const inputRef = useRef();
  const input2Ref = useRef();
  useImperativeHandle(
    ref,
    () => {
      return { value };
    },
    [value]
  );
  return (
    <>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
}

export const Input = forwardRef(Inner);

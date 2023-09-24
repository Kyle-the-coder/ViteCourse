import { forwardRef, useImperativeHandle, useRef } from "react";

function Inner(props, ref) {
  const [value, setValue] = useState();
  const inputRef = useRef();
  const input2Ref = useRef();
  useImperativeHandle(ref, () => {
    return { input1: inputRef.current, input2: input2Ref.current };
  });
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

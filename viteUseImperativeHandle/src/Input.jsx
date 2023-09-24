import { forwardRef } from "react";

function Inner(props, ref) {
  return <input {...props} ref={ref} />;
}

export const Input = forwardRef(Inner);

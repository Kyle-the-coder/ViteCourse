import { forwardRef } from "react";

function InnerCustomInput(props, ref) {
  return <input {...props} ref={ref} style={{ border: "2px solid green" }} />;
}

export const CustomInput = forwardRef(InnerCustomInput);

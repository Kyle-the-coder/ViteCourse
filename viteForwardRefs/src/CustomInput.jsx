import { forwardRef } from "react";

function InnerCustomInput(props) {
  return <input {...props} style={{ border: "2px solid green" }} />;
}

export const CustomInput = forwardRef(InnerCustomInput);

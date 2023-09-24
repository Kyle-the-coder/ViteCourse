import { useId } from "react";

export function Input() {
  const id = useId();
  return (
    <div>
      <label htmlFor={`email-${id}`}>Email:</label>
      <input type="text" id={`email-${id}`} />
      <label htmlFor={`name-${id}`}>Name:</label>
      <input type="text" id={`name-${id}`} />
    </div>
  );
}

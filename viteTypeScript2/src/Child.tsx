import React from "react";
import type { ReactNode } from "react";

type ChildProps = {
  children: ReactNode;
};
export function Child({ children }: ChildProps) {
  return <h1> {children}</h1>;
}

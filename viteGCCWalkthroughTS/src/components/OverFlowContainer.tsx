import React, { Key, ReactNode } from "react";

type OverflowContainerProps<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
  renderOverflow: (overflowAmount: number) => ReactNode;
  getKey: (item: T) => Key;
  className?: string;
};

export function OverFlowContainer<T>({
  items,
  getKey,
  renderItem,
  renderOverflow,
  className,
}: OverflowContainerProps<T>) {
  return (
    <>
      <div className={className}>
        {items.map((item) => {
          return <div key={getKey(item)}>{renderItem(item)}</div>;
        })}
      </div>
      <div>{renderOverflow(overflowAmount)}</div>
    </>
  );
}
